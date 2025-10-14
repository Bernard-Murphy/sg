console.log(
  JSON.parse(
    Buffer.from(
      "eyJjYXRlZ29yeSI6InJlY2VpcHQiLCJ2YWx1ZXMiOnsiZGVzY3JpcHRpb24iOiJ0ZXN0IiwicGF5QW1vdW50IjoiNiIsInBheVR5cGUiOiJjaGVjayJ9fQ==",
      "base64"
    ).toString("utf-8")
  )
);
