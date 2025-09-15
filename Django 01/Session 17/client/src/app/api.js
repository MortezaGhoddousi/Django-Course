const api = "http://localhost:8000";

function toPersianNumber(num) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .split("")
    .map((c) => {
      if (/\d/.test(c)) {
        return persianDigits[c];
      } else {
        return c;
      }
    })
    .join("");
}

const POST = async (req) => {
  const formData = await req.formData();
  const file = formData.get("image");

  if (!file || !file.name || !file.stream) {
    return NextResponse.json(
      { success: false, message: "No file uploaded" },
      { status: 400 }
    );
  }

  // Make sure logos directory exists
  const logosDir = path.join(process.cwd(), "public", "logos");
  if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
  }

  // Create unique filename to avoid overwrites
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const extension = path.extname(file.name);
  const fileName = `${uniqueSuffix}${extension}`;

  const filePath = path.join(logosDir, fileName);

  // Save file from stream to disk
  const fileStream = file.stream();

  const writeStream = fs.createWriteStream(filePath);
  await new Promise((resolve, reject) => {
    fileStream.pipe(writeStream);
    fileStream.on("end", resolve);
    fileStream.on("error", reject);
  });

  // Return public URL path for the uploaded image
  const imageUrl = `/logos/${fileName}`;

  return NextResponse.json({ success: true, image_url: imageUrl });
};

export { api, toPersianNumber, POST };
