using BankMS_API.Data;
using BankMS_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;

namespace BankMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    [Authorize]
    public class TransactionsController : ControllerBase
    {
        private readonly BankDbContext _context;

        public TransactionsController(BankDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetAllTransactions()
        {
            var transactions = await _context.Transactions
                .Include(t => t.Account)
                .ToListAsync();

            return Ok(transactions);
        }

        [HttpGet("account/{accountId}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactionsByAccountId(int accountId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.AccountId == accountId)
                .Include(t => t.Account)
                .ToListAsync();

            if (!transactions.Any())
            {
                return NotFound($"No transactions found for Account ID {accountId}.");
            }

            return Ok(transactions);
        }

        [HttpPost("deposit")]
        public async Task<IActionResult> Deposit(Transaction transaction)
        {
            var account = await _context.Accounts.FindAsync(transaction.AccountId);
            if (account == null) return NotFound();

            account.Balance += transaction.Amount;
            transaction.TransactionType = "Deposit";
            transaction.TransactionDate = DateTime.UtcNow;

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }

        [HttpPost("withdraw")]
        public async Task<IActionResult> Withdraw(Transaction transaction)
        {
            var account = await _context.Accounts.FindAsync(transaction.AccountId);
            if (account == null) return NotFound();

            if (account.Balance < transaction.Amount) return BadRequest("Insufficient balance.");

            account.Balance -= transaction.Amount;
            transaction.TransactionType = "Withdrawal";
            transaction.TransactionDate = DateTime.UtcNow;

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }

        [HttpPost("transfer")]
        public async Task<IActionResult> Transfer(Transaction transaction)
        {
            var fromAccount = await _context.Accounts.FindAsync(transaction.AccountId);
            if (fromAccount == null) return NotFound();

            if (fromAccount.Balance < transaction.Amount) return BadRequest("Insufficient balance.");

            fromAccount.Balance -= transaction.Amount;

            var toAccount = await _context.Accounts
                .FirstOrDefaultAsync(a => a.AccountNumber == transaction.ExternalBankDetails);
            if (toAccount != null) toAccount.Balance += transaction.Amount;

            transaction.TransactionType = "Transfer";
            transaction.TransactionDate = DateTime.UtcNow;

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }
        [HttpGet("monthlyStatement/{accountId}/{month}/{year}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetMonthlyStatement(int accountId, int month, int year)
        {
            var transactions = await _context.Transactions
                .Where(t => t.AccountId == accountId && t.TransactionDate.Month == month && t.TransactionDate.Year == year)
                .Include(t => t.Account)
                .ToListAsync();

            if (!transactions.Any())
            {
                return NotFound($"No transactions found for Account ID {accountId} for {month}/{year}.");
            }

            return Ok(transactions);
        }
        [HttpGet("detailedReport/{accountId}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetDetailedReport(int accountId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.AccountId == accountId)
                .Include(t => t.Account)
                .ToListAsync();

            if (!transactions.Any())
            {
                return NotFound($"No transactions found for Account ID {accountId}.");
            }

            return Ok(transactions);
        }
        [HttpGet("exportExcel/{accountId}")]
        public async Task<IActionResult> ExportTransactionsToExcel(int accountId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.AccountId == accountId)
                .ToListAsync();

            if (!transactions.Any())
            {
                return NotFound($"No transactions found for Account ID {accountId}.");
            }

            var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add("Transactions");
            worksheet.Cells[1, 1].Value = "Transaction ID";
            worksheet.Cells[1, 2].Value = "Account ID";
            worksheet.Cells[1, 3].Value = "Transaction Type";
            worksheet.Cells[1, 4].Value = "Amount";
            worksheet.Cells[1, 5].Value = "Date";
            worksheet.Cells[1, 6].Value = "External Bank Details";

            for (int i = 0; i < transactions.Count; i++)
            {
                var transaction = transactions[i];
                worksheet.Cells[i + 2, 1].Value = transaction.TransactionId;
                worksheet.Cells[i + 2, 2].Value = transaction.AccountId;
                worksheet.Cells[i + 2, 3].Value = transaction.TransactionType;
                worksheet.Cells[i + 2, 4].Value = transaction.Amount;
                worksheet.Cells[i + 2, 5].Value = transaction.TransactionDate;
                worksheet.Cells[i + 2, 6].Value = transaction.ExternalBankDetails;
            }

            var stream = new MemoryStream(package.GetAsByteArray());
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Transactions.xlsx");
        }

    }
}
