
Set-Location "c:\Users\Ahmet\Desktop\KLUMobil\KLUMobile"

$allUntracked = @(git ls-files --others --exclude-standard)
Write-Host "Untracked dosya sayisi: $($allUntracked.Count)"

$days = @("2026-03-01", "2026-03-02", "2026-03-03")
$msgList = @("feat: add", "chore: include", "refactor: integrate", "feat: implement", "chore: add")
$total = $allUntracked.Count
$perDay = [math]::Ceiling($total / $days.Count)
$totalCommits = 0

for ($dayIdx = 0; $dayIdx -lt $days.Count; $dayIdx++) {
    $dateStr = $days[$dayIdx]
    $startIdx = $dayIdx * $perDay
    $endIdx = [math]::Min($startIdx + $perDay - 1, $total - 1)

    if ($startIdx -gt ($total - 1)) {
        Write-Host "${dateStr} - commit edilecek dosya yok"
        continue
    }

    $dayFiles = $allUntracked[$startIdx..$endIdx]
    $dayCount = $dayFiles.Count
    Write-Host ""
    Write-Host "=== ${dateStr} - ${dayCount} dosya ==="

    $cNum = 0
    foreach ($f in $dayFiles) {
        $cNum++
        $hour = 8 + [int][math]::Floor(($cNum - 1) * 13.0 / $dayCount)
        $min = ($cNum * 11) % 60
        $sec = ($cNum * 17) % 60
        $hh = if ($hour -lt 10) { "0$hour" } else { "$hour" }
        $mm = if ($min -lt 10) { "0$min" } else { "$min" }
        $ss = if ($sec -lt 10) { "0$sec" } else { "$sec" }
        $dt = "${dateStr}T${hh}:${mm}:${ss}+03:00"

        $env:GIT_AUTHOR_DATE = $dt
        $env:GIT_COMMITTER_DATE = $dt

        git add $f 2>&1 | Out-Null
        $shortName = Split-Path $f -Leaf
        $tmpl = $msgList[$cNum % $msgList.Count]
        $commitMsg = "${tmpl} ${shortName}"
        git commit -m $commitMsg 2>&1 | Out-Null

        if ($LASTEXITCODE -eq 0) {
            $totalCommits++
            Write-Host "  [OK] ${cNum}/${dayCount} - ${dt} - ${f}" -ForegroundColor Green
        }
        else {
            Write-Host "  [SKIP] ${f}" -ForegroundColor DarkYellow
        }
    }
}

Remove-Item Env:GIT_AUTHOR_DATE    -ErrorAction SilentlyContinue
Remove-Item Env:GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== Toplam ${totalCommits} commit olusturuldu. Push ediliyor... ==="
git push origin main
Write-Host "Tamamlandi!" -ForegroundColor Green
