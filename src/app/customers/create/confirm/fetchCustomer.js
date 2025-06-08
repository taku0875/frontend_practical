export default async function fetchCustomer(id) {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`;
  console.log("✅ 呼び出しURL:", url); // ← 追加
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}
