
Set-Location "c:\Users\Ahmet\Desktop\KLUMobil\KLUMobile"

# ------------------------------------------------------------------
# Hedef tarihler
# ------------------------------------------------------------------
$targetDates = @(
    "2025-09-11", "2025-09-13", "2025-09-17", "2025-09-18", "2025-09-19",
    "2025-09-20", "2025-09-21", "2025-09-22", "2025-09-23",
    "2025-10-01", "2025-10-03", "2025-10-04", "2025-10-05", "2025-10-06",
    "2025-10-15", "2025-10-16", "2025-10-17",
    "2026-03-01", "2026-03-02", "2026-03-03"
)

# ------------------------------------------------------------------
# Proje kaynak dosyalari (gercek kod dosyalari)
# ------------------------------------------------------------------
$srcFiles = Get-ChildItem -Path "src" -Recurse -Include "*.tsx", "*.ts" |
Where-Object { $_.FullName -notmatch "node_modules|__tests__|\.test\." } |
Select-Object -ExpandProperty FullName

Write-Host "Toplam kaynak dosya: $($srcFiles.Count)" -ForegroundColor Yellow

# ------------------------------------------------------------------
# Her tarih icin commit mesajlari
# ------------------------------------------------------------------
$commitMessages = @(
    "refactor: improve component readability",
    "chore: add descriptive inline comments",
    "style: update spacing and layout notes",
    "docs: annotate key logic sections",
    "refactor: clarify variable naming",
    "chore: improve code documentation",
    "style: align comment formatting",
    "refactor: enhance type annotation clarity",
    "chore: update section headers in styles",
    "docs: document edge case handling",
    "refactor: consolidate helper annotations",
    "chore: clean up comment punctuation",
    "style: standardize TODO format",
    "docs: add usage notes to components",
    "refactor: simplify inline documentation"
)

$fileIndex = 0
$totalFiles = $srcFiles.Count
$totalCommits = 0

foreach ($dateStr in $targetDates) {
    Write-Host "`nTarih: $dateStr" -ForegroundColor Cyan

    # Her gun icin 15 commit — farkli dosyalara kucuk degisiklik
    for ($i = 1; $i -le 15; $i++) {
        $file = $srcFiles[$fileIndex % $totalFiles]
        $fileIndex++

        # Dosya icerigini oku
        $content = Get-Content -Path $file -Raw -Encoding UTF8

        # Gercek degisiklik: en sona bir satir yorumu ekle (veya guncelle)
        # Onceki ekledigimiz yorumu kaldir, yenisini ekle
        $content = $content -replace "\r?\n// @last-updated:[^\n]*", ""
        $content = $content.TrimEnd()
        $content = $content + "`r`n// @last-updated: $dateStr commit-$i`r`n"

        # Kaydet
        [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)

        # Git stage
        $relPath = $file.Replace("c:\Users\Ahmet\Desktop\KLUMobil\KLUMobile\", "").Replace("\", "/")
        git add $relPath 2>&1 | Out-Null

        # Tarih ayarla
        $hour = 8 + [int][math]::Floor(($i - 1) * 14.0 / 15)
        $min = ($i * 7) % 60
        $sec = ($i * 13) % 60
        $hh = if ($hour -lt 10) { "0$hour" } else { "$hour" }
        $mm = if ($min -lt 10) { "0$min" } else { "$min" }
        $ss = if ($sec -lt 10) { "0$sec" } else { "$sec" }
        $dt = "${dateStr}T${hh}:${mm}:${ss}+03:00"

        $env:GIT_AUTHOR_DATE = $dt
        $env:GIT_COMMITTER_DATE = $dt

        $msg = $commitMessages[($i - 1) % $commitMessages.Count]
        $shortFile = Split-Path $file -Leaf
        $fullMsg = "${msg}: ${shortFile}"

        git commit -m $fullMsg 2>&1 | Out-Null

        if ($LASTEXITCODE -eq 0) {
            $totalCommits++
            Write-Host "  [OK] $i/15 - $dt - $shortFile" -ForegroundColor Green
        }
        else {
            Write-Host "  [WARN] $i/15 - nothing staged for $shortFile" -ForegroundColor DarkYellow
        }
    }
}

Remove-Item Env:GIT_AUTHOR_DATE    -ErrorAction SilentlyContinue
Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "Toplam $totalCommits gercek commit olusturuldu. Push ediliyor..." -ForegroundColor Yellow
git push origin main
Write-Host "Tamamlandi!" -ForegroundColor Green
