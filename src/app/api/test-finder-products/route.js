const PRODUCTS_API_URL = "http://247labstage.spctek.com:8081/api/products";

export async function GET() {
  try {
    const response = await fetch(PRODUCTS_API_URL, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return Response.json(
        { error: `Product API failed with status ${response.status}` },
        { status: response.status },
      );
    }

    const payload = await response.json();
    return Response.json(payload);
  } catch {
    return Response.json(
      { error: "Unable to load products from upstream API." },
      { status: 502 },
    );
  }
}
