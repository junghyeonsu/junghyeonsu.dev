#!/usr/bin/env bun

// PNG/JPG/JPEG 이미지를 WebP 포맷으로 변환하는 스크립트입니다.
// ffmpeg를 사용하여 이미지를 변환하며, 다양한 옵션을 지원합니다.
//
// 사용법:
// 1. 미리보기 (dry-run): bun scripts/convert-images-to-webp.ts --dry-run
// 2. 기본 변환: bun scripts/convert-images-to-webp.ts
// 3. 품질 지정: bun scripts/convert-images-to-webp.ts --quality 90
// 4. 경로 지정: bun scripts/convert-images-to-webp.ts --path "content/**/*.png"
// 5. 원본 삭제: bun scripts/convert-images-to-webp.ts --delete-original
//
// 옵션:
// --dry-run: 실제 변환 없이 변환될 파일 목록만 출력
// --quality: WebP 품질 설정 (0-100, 기본값: 80)
// --path: 변환할 파일 경로 지정 (glob 패턴 지원)
// --delete-original: 변환 후 원본 파일 삭제

import { $ } from "bun";
import fs from "fs/promises";

interface Options {
  dryRun: boolean;
  quality: number;
  pathPattern: string;
  deleteOriginal: boolean;
}

/**
 * CLI 옵션 파싱
 */
function parseOptions(): Options {
  const args = process.argv.slice(2);
  const options: Options = {
    dryRun: false,
    quality: 80,
    pathPattern: "content/**/*.{png,jpg,jpeg}",
    deleteOriginal: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "--dry-run":
        options.dryRun = true;
        break;
      case "--quality": {
        const quality = Number.parseInt(args[++i], 10);
        if (Number.isNaN(quality) || quality < 0 || quality > 100) {
          console.error("❌ --quality 값은 0-100 사이의 숫자여야 합니다.");
          process.exit(1);
        }
        options.quality = quality;
        break;
      }
      case "--path":
        options.pathPattern = args[++i];
        if (!options.pathPattern) {
          console.error("❌ --path 옵션에는 glob 패턴이 필요합니다.");
          process.exit(1);
        }
        break;
      case "--delete-original":
        options.deleteOriginal = true;
        break;
      default:
        if (arg.startsWith("--")) {
          console.error(`❌ 알 수 없는 옵션: ${arg}`);
          process.exit(1);
        }
    }
  }

  return options;
}

/**
 * ffmpeg 설치 확인
 */
async function checkFfmpeg(): Promise<boolean> {
  try {
    await $`which ffmpeg`.quiet();
    return true;
  } catch {
    return false;
  }
}

/**
 * 이미지 파일을 WebP로 변환
 */
async function convertToWebp(
  imagePath: string,
  quality: number,
  dryRun: boolean,
): Promise<{ success: boolean; webpPath: string }> {
  const webpPath = imagePath.replace(/\.(png|jpe?g)$/i, ".webp");

  if (dryRun) {
    return { success: true, webpPath };
  }

  try {
    // ffmpeg를 사용하여 이미지를 WebP로 변환
    // -y: 기존 파일 덮어쓰기
    // -i: 입력 파일
    // -quality: WebP 품질 설정
    await $`ffmpeg -y -i ${imagePath} -quality ${quality} ${webpPath}`.quiet();
    return { success: true, webpPath };
  } catch (error) {
    console.error(`❌ 변환 실패: ${imagePath}`, error);
    return { success: false, webpPath };
  }
}

/**
 * 파일 크기를 사람이 읽기 쉬운 형식으로 변환
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * 파일 크기 가져오기
 */
async function getFileSize(filePath: string): Promise<number> {
  try {
    const stat = await fs.stat(filePath);
    return stat.size;
  } catch {
    return 0;
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log("🖼️  이미지 → WebP 변환 스크립트\n");

  // 옵션 파싱
  const options = parseOptions();

  console.log("⚙️  옵션:");
  console.log(`  - Dry Run: ${options.dryRun ? "✅" : "❌"}`);
  console.log(`  - Quality: ${options.quality}`);
  console.log(`  - Path Pattern: ${options.pathPattern}`);
  console.log(`  - Delete Original: ${options.deleteOriginal ? "✅" : "❌"}\n`);

  // ffmpeg 설치 확인
  console.log("🔍 ffmpeg 설치 확인 중...");
  const hasFfmpeg = await checkFfmpeg();
  if (!hasFfmpeg) {
    console.error("❌ ffmpeg가 설치되어 있지 않습니다.");
    console.error("   설치 방법: brew install ffmpeg (macOS)");
    process.exit(1);
  }
  console.log("✅ ffmpeg 설치 확인 완료\n");

  // 이미지 파일 검색
  console.log(`🔎 이미지 파일 검색 중... (${options.pathPattern})`);
  const imageFiles: string[] = [];

  const globber = new Bun.Glob(options.pathPattern);
  for await (const file of globber.scan(".")) {
    imageFiles.push(file);
  }

  if (imageFiles.length === 0) {
    console.log("📝 변환할 이미지 파일이 없습니다.");
    return;
  }

  console.log(`📊 ${imageFiles.length}개의 이미지 파일을 찾았습니다.\n`);

  if (options.dryRun) {
    console.log("🔍 [DRY RUN] 변환될 파일 목록:\n");
    for (const imageFile of imageFiles) {
      const webpFile = imageFile.replace(/\.(png|jpe?g)$/i, ".webp");
      const imageSize = await getFileSize(imageFile);
      console.log(`  ${imageFile} (${formatFileSize(imageSize)})`);
      console.log(`  → ${webpFile}\n`);
    }
    console.log(`✅ [DRY RUN] 총 ${imageFiles.length}개의 파일이 변환될 예정입니다.`);
    return;
  }

  // 실제 변환 수행
  console.log("🔄 변환 시작...\n");

  let successCount = 0;
  let failCount = 0;
  let totalOriginalSize = 0;
  let totalWebpSize = 0;

  for (const imageFile of imageFiles) {
    const imageSize = await getFileSize(imageFile);
    totalOriginalSize += imageSize;

    console.log(`  🔄 ${imageFile} (${formatFileSize(imageSize)})`);

    const { success, webpPath } = await convertToWebp(imageFile, options.quality, false);

    if (success) {
      const webpSize = await getFileSize(webpPath);
      totalWebpSize += webpSize;
      const savings = imageSize - webpSize;
      const savingsPercent = ((savings / imageSize) * 100).toFixed(1);

      console.log(
        `  ✅ ${webpPath} (${formatFileSize(webpSize)}) - ${formatFileSize(savings)} 절약 (${savingsPercent}%)\n`,
      );

      successCount++;

      // 원본 삭제 옵션이 활성화된 경우
      if (options.deleteOriginal) {
        try {
          await fs.unlink(imageFile);
          console.log(`  🗑️  원본 파일 삭제: ${imageFile}\n`);
        } catch (error) {
          console.error(`  ⚠️  원본 파일 삭제 실패: ${imageFile}`, error);
        }
      }
    } else {
      failCount++;
    }
  }

  // 결과 요약
  console.log("\n📊 변환 결과:");
  console.log(`  - 성공: ${successCount}개`);
  console.log(`  - 실패: ${failCount}개`);
  console.log(`  - 원본 크기: ${formatFileSize(totalOriginalSize)}`);
  console.log(`  - 변환 크기: ${formatFileSize(totalWebpSize)}`);
  console.log(
    `  - 총 절약: ${formatFileSize(totalOriginalSize - totalWebpSize)} (${(((totalOriginalSize - totalWebpSize) / totalOriginalSize) * 100).toFixed(1)}%)`,
  );

  if (failCount > 0) {
    console.log("\n⚠️  일부 파일 변환에 실패했습니다.");
    process.exit(1);
  }

  console.log("\n✅ 모든 파일 변환 완료!");
}

main();
