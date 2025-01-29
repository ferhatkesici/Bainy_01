# Exclude patterns for React components
$excludePatterns = @(
    '*Component.jsx',
    '*Component.tsx',
    '*Page.jsx',
    '*Page.tsx'
)

# Get all files recursively in src directory
Get-ChildItem -Path ".\src" -Recurse -File | ForEach-Object {
    $shouldRename = $true
    
    # Check if file matches any exclude pattern
    foreach ($pattern in $excludePatterns) {
        if ($_.Name -like $pattern) {
            $shouldRename = $false
            break
        }
    }
    
    # Rename if should rename
    if ($shouldRename) {
        $newName = $_.Name.ToLower()
        if ($_.Name -ne $newName) {
            Write-Host "Renaming $($_.Name) to $newName"
            Rename-Item -Path $_.FullName -NewName $newName -Force
        }
    }
}

Write-Host "File renaming complete!" 