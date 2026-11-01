import argparse
import base64
import os
import sys
import requests
from dotenv import load_dotenv

# .env 로드
load_dotenv()

def generate_image(prompt: str, output_path: str, aspect_ratio: str = "1:1"):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: .env 파일에서 GEMINI_API_KEY를 찾을 수 없습니다.", file=sys.stderr)
        sys.exit(1)

    # Google AI Studio Imagen 3 엔드포인트
    url = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key={api_key}"

    headers = {
        "Content-Type": "application/json"
    }

    payload = {
        "instances": [
            {
                "prompt": prompt
            }
        ],
        "parameters": {
            "sampleCount": 1,
            "outputMimeType": "image/png",
            "aspectRatio": aspect_ratio
        }
    }

    # 디렉터리 생성
    output_dir = os.path.dirname(output_path)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir, exist_ok=True)

    try:
        print(f"[요청 중] 프롬프트: {prompt}")
        response = requests.post(url, headers=headers, json=payload)

        if response.status_code != 200:
            print(f"[실패] API 응답 에러 ({response.status_code}): {response.text}", file=sys.stderr)
            sys.exit(1)

        data = response.json()
        
        # 반환된 predictions에서 Base64 이미지 디코딩
        predictions = data.get("predictions", [])
        if not predictions:
            print(f"[실패] 응답에 생성된 이미지가 없습니다: {data}", file=sys.stderr)
            sys.exit(1)

        image_b64 = predictions[0].get("bytesBase64Encoded")
        image_bytes = base64.b64decode(image_b64)

        with open(output_path, "wb") as f:
            f.write(image_bytes)

        print(f"[완료] 저장 경로: {output_path}")

    except Exception as e:
        print(f"[실패] 에러 발생: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Gemini REST API 이미지 생성 스크립트")
    parser.add_argument("--prompt", type=str, required=True, help="생성할 영문 프롬프트")
    parser.add_argument("--output", type=str, default="output.png", help="저장할 파일 경로")
    parser.add_argument("--ratio", type=str, default="1:1", help="비율 (1:1, 16:9 등)")

    args = parser.parse_args()
    generate_image(args.prompt, args.output, args.ratio)