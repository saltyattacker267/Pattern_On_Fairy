import os
import sys
import time
import shutil
import subprocess
from pathlib import Path
from PIL import Image

def copy_to_clipboard(text: str):
    """프롬프트를 Windows 클립보드에 복사합니다."""
    process = subprocess.Popen('clip', stdin=subprocess.PIPE, shell=True)
    process.communicate(input=text.encode('utf-16le'))

def main():
    if len(sys.argv) < 3:
        print("Usage: python asset_bridge.py \"<prompt>\" \"<target_path>\" [--rembg]")
        sys.exit(1)

    prompt = sys.argv[1]
    target_path = Path(sys.argv[2])
    use_rembg = "--rembg" in sys.argv

    # 1. 저장할 대상 폴더 생성
    target_path.parent.mkdir(parents=True, exist_ok=True)

    # 2. 클립보드에 프롬프트 복사
    copy_to_clipboard(prompt)
    print("\n" + "="*60)
    print(f"[ASSET BRIDGE] 에셋 생성 대기 중: {target_path.as_posix()}")
    print("[PROMPT COPIED] 클립보드에 프롬프트가 복사되었습니다.")
    print("1. Gemini 웹 브라우저 채팅창에 붙여넣기(Ctrl+V) 후 실행하세요.")
    print("2. 생성된 이미지의 '다운로드' 버튼을 누르세요.")
    print("="*60 + "\n")

    # 3. 다운로드 폴더 감시 준비
    downloads_dir = Path.home() / "Downloads"
    valid_exts = {".png", ".jpg", ".jpeg", ".webp"}
    
    # 실행 시점 기준 기존 파일 목록 스냅샷 기록
    before_files = {
        f: f.stat().st_mtime 
        for f in downloads_dir.iterdir() 
        if f.is_file() and f.suffix.lower() in valid_exts
    }

    detected_file = None
    try:
        while True:
            time.sleep(1.0)
            for f in downloads_dir.iterdir():
                if not f.is_file():
                    continue
                # 크롬/엣지 임시 다운로드 파일(.crdownload, .tmp) 무시
                if f.suffix.lower() not in valid_exts:
                    continue
                
                mtime = f.stat().st_mtime
                if f not in before_files or mtime > before_files[f]:
                    # 파일 쓰기가 완전히 끝날 때까지 잠시 대기
                    time.sleep(0.8)
                    detected_file = f
                    break
            if detected_file:
                break
    except KeyboardInterrupt:
        print("\n[ASSET BRIDGE] 사용자에 의해 중단되었습니다.")
        sys.exit(1)

    # 4. 이미지 이동 및 PNG 규격 변환 (후처리)
    try:
        img = Image.open(detected_file)
        if use_rembg:
            try:
                from rembg import remove
                print("[ASSET BRIDGE] 배경 투명화(rembg) 처리 중...")
                img = remove(img)
            except ImportError:
                print("[WARNING] rembg가 설치되지 않아 원본 그대로 저장합니다.")
        
        img.save(target_path, format="PNG")
        detected_file.unlink() # 다운로드 폴더의 원본 임시 파일 삭제
        print(f"[SUCCESS] 에셋 적용 완료 -> {target_path.as_posix()}")
    except Exception as e:
        print(f"[ERROR] 파일 처리 중 오류 발생: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()