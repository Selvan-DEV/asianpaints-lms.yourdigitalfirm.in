import { NextResponse } from "next/server";

export async function GET(req: Request) {

    console.log(req, 'req');
    try {
        const { searchParams } = new URL(req.url);
        const pdfUrl = searchParams.get("url");

        console.log("Incoming PDF URL:", pdfUrl); // Debugging

        if (!pdfUrl) {
            return NextResponse.json({ error: "PDF URL is required" }, { status: 400 });
        }

        // Fetch the PDF from the external URL
        const response = await fetch(pdfUrl, {
            headers: { "User-Agent": "Mozilla/5.0" },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.status}`);
        }

        // Read the PDF content
        const pdfBuffer = await response.arrayBuffer();

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="document.pdf"`,
            },
        });

    } catch (error) {
        console.error("Error fetching PDF:", error);
        return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 500 });
    }
}
