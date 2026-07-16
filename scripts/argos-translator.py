#!/usr/bin/env python3
"""JSON bridge between the Node.js documentation sync and Argos Translate."""

from __future__ import annotations

import argparse
import contextlib
import json
import sys
from typing import Any


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--from", dest="source_language", required=True)
    parser.add_argument("--to", dest="target_language", required=True)
    parser.add_argument("--model-package", required=True)
    parser.add_argument("--model-version", required=True)
    return parser.parse_args()


def read_texts() -> list[str]:
    payload: Any = json.load(sys.stdin)
    texts = payload.get("texts") if isinstance(payload, dict) else None
    if not isinstance(texts, list) or not all(isinstance(text, str) for text in texts):
        raise ValueError("Expected a JSON object containing a string array named 'texts'.")
    return texts


def find_translation(source_language: str, target_language: str):
    import argostranslate.translate

    installed_languages = argostranslate.translate.get_installed_languages()
    source = next(
        (language for language in installed_languages if language.code == source_language),
        None,
    )
    target = next(
        (language for language in installed_languages if language.code == target_language),
        None,
    )
    if source is None or target is None:
        return None

    try:
        return source.get_translation(target)
    except Exception:
        return None


def install_model(
    source_language: str,
    target_language: str,
    model_package: str,
    model_version: str,
) -> None:
    import argostranslate.package

    argostranslate.package.update_package_index()
    available_packages = argostranslate.package.get_available_packages()
    selected = next(
        (
            package
            for package in available_packages
            if package.code == model_package
            and package.from_code == source_language
            and package.to_code == target_language
            and package.package_version == model_version
        ),
        None,
    )
    if selected is None:
        raise RuntimeError(
            f"Argos model {model_package} version {model_version} is not available."
        )

    argostranslate.package.install_from_path(selected.download())


def main() -> None:
    if hasattr(sys.stdin, "reconfigure"):
        sys.stdin.reconfigure(encoding="utf-8")
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8")

    arguments = parse_arguments()
    texts = read_texts()

    # Some ML dependencies write progress information to stdout. Keep stdout as a
    # clean machine-readable JSON channel for the Node.js process.
    with contextlib.redirect_stdout(sys.stderr):
        try:
            translation = find_translation(
                arguments.source_language,
                arguments.target_language,
            )
        except ModuleNotFoundError as error:
            raise RuntimeError(
                "Argos Translate is not installed. Run: "
                "python -m pip install -r requirements-i18n.txt"
            ) from error

        if translation is None:
            install_model(
                arguments.source_language,
                arguments.target_language,
                arguments.model_package,
                arguments.model_version,
            )
            translation = find_translation(
                arguments.source_language,
                arguments.target_language,
            )

        if translation is None:
            raise RuntimeError(
                f"Argos could not load {arguments.source_language} -> "
                f"{arguments.target_language} after installing the model."
            )

        translated = [translation.translate(text) for text in texts]

    json.dump({"translations": translated}, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Argos translation failed: {error}", file=sys.stderr)
        raise SystemExit(1) from error
