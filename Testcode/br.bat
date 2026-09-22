@echo off
setlocal

if "%~1"=="" (
    echo Usage: br ^<file.cpp^>
    echo Example: br .\mutex.cpp
    exit /b 1
)

set "SRC=%~1"
set "NAME=%~n1"
set "COMPILER=C:\msys64\ucrt64\bin\g++.exe"
set "OUTPUT_DIR=%~dp1output"
set "OUTPUT=%OUTPUT_DIR%\%NAME%.exe"
set "PATH=C:\msys64\ucrt64\bin;%PATH%"

if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

echo [BUILD] Compiling %NAME%.cpp ...
"%COMPILER%" -std=c++20 -o "%OUTPUT%" "%SRC%"

if %ERRORLEVEL% neq 0 (
    echo [BUILD] FAILED! See errors above.
    exit /b %ERRORLEVEL%
)

echo [BUILD] OK --^> %OUTPUT%
echo [RUN] Running %NAME%.exe ...
echo ------------------------------------------
"%OUTPUT%"
