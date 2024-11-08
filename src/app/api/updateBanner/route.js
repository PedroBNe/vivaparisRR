import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataFilePath = path.join(process.cwd(), 'data.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf-8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data[0].banner); // Envia apenas a seção de banner
  } catch (error) {
    console.error("Error reading banner data:", error);
    return NextResponse.json({ message: 'Error reading banner data' }, { status: 500 });
  }
}

export async function POST(req) {
  const { title, subtitle } = await req.json();

  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf-8');
    const data = JSON.parse(fileContents);

    data[0].banner.title = title;
    data[0].banner.subtitle = subtitle;

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Banner updated successfully!' });
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json({ message: 'Error updating banner' }, { status: 500 });
  }
}
