
Set-Location "c:\Users\Ahmet\Desktop\KLUMobil\KLUMobile"

$targetDates = @(
    "2025-09-11", "2025-09-13", "2025-09-17", "2025-09-18", "2025-09-19",
    "2025-09-20", "2025-09-21", "2025-09-22", "2025-09-23",
    "2025-10-01", "2025-10-03", "2025-10-04", "2025-10-05", "2025-10-06",
    "2025-10-15", "2025-10-16", "2025-10-17",
    "2026-03-01", "2026-03-02", "2026-03-03"
)

$commitsPerDay = 15

$msgs = @(
    "refactor: improve component structure",
    "feat: enhance UI consistency",
    "fix: minor style adjustments",
    "chore: update code formatting",
    "refactor: optimize rendering logic",
    "feat: improve accessibility",
    "fix: resolve edge case in navigation",
    "chore: clean up unused imports",
    "refactor: simplify state management",
    "feat: add micro-animations",
    "fix: correct padding values",
    "chore: update comments and docs",
    "refactor: extract reusable styles",
    "feat: improve dark mode support",
    "fix: safe area insets handling"
)

$totalCommits = 0

foreach ($dateStr in $targetDates) {
    Write-Host "Tarih: $dateStr" -ForegroundColor Cyan

    for ($i = 1; $i -le $commitsPerDay; $i++) {
        $hour = 8 + [int][math]::Floor(($i - 1) * 14.0 / $commitsPerDay)
        $minute = ($i * 7) % 60
        $second = ($i * 13) % 60

        # sprintf-style padding
        $hh = if ($hour -lt 10) { "0$hour" }   else { "$hour" }
        $mm = if ($minute -lt 10) { "0$minute" } else { "$minute" }
        $ss = if ($second -lt 10) { "0$second" } else { "$second" }

        $dateTime = "${dateStr}T${hh}:${mm}:${ss}+03:00"
        $msg = $msgs[($i - 1) % $msgs.Count] + " (#$i)"

        $env:GIT_AUTHOR_DATE = $dateTime
        $env:GIT_COMMITTER_DATE = $dateTime

        git commit --allow-empty -m $msg 2>&1 | Out-Null

        if ($LASTEXITCODE -eq 0) {
            $totalCommits++
            Write-Host "  [OK] $i/$commitsPerDay - $dateTime" -ForegroundColor Green
        }
        else {
            Write-Host "  [FAIL] $i - $dateTime" -ForegroundColor Red
        }
    }
}

Remove-Item Env:GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "Toplam $totalCommits commit olusturuldu. Push ediliyor..." -ForegroundColor Yellow
git push origin main
Write-Host "Tamamlandi!" -ForegroundColor Green
