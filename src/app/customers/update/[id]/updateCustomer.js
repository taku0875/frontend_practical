export default async function updateCustomer(formData) {
  const updated_customer_name = formData.get("customer_name");
  const updated_customer_id = formData.get("customer_id");
  const updated_age = parseInt(formData.get("age"));
  const updated_gender = formData.get("gender");

  const body_msg = JSON.stringify({
    customer_name: updated_customer_name,
    customer_id: updated_customer_id,
    age: updated_age,
    gender: updated_gender,
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers`;
  console.log("Attempting to PUT to:", apiUrl); // API URLを確認
  console.log("Request body:", body_msg);       // 送信するデータを確認

  try {
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // 必須ではない場合もあるが、一般的に良い習慣
      },
      body: body_msg,
    });

    if (!res.ok) {
      // サーバーがエラーレスポンスを返した場合
      const errorData = await res.text(); // エラーレスポンスの本文を取得 (JSONかもしれないし、テキストかもしれない)
      console.error("API Error Response:", errorData);
      console.error("API Error Status:", res.status);
      throw new Error(
        `Failed to update customer. Status: ${res.status}. Message: ${errorData}`
      );
    }
    // 成功した場合、必要に応じてレスポンスを処理する
    // const responseData = await res.json(); // 例えばJSONレスポンスを期待する場合
    // console.log("Update successful:", responseData);
    // return responseData; // 必要なら結果を返す
  } catch (error) {
    // fetch自体が失敗した場合 (ネットワークエラー、CORSエラーなど)
    // または res.ok でない場合に throw したエラー
    console.error("Fetch error:", error);
    // "Failed to fetch" の場合は、ここで補足される
    // error.message を見て、より具体的なエラー原因を特定する
    throw new Error(`Network or other error during fetch: ${error.message}`);
  }
}