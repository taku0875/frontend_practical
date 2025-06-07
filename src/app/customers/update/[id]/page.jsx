"use client";
import { useEffect, useState, useRef, use } from "react"; // `use` を再度インポート
import { useRouter } from "next/navigation";
import fetchCustomer from "./fetchCustomer";
import updateCustomer from "./updateCustomer";

export default function UpdatePage(props) {
  const paramsPromise = props.params; // props.params は Promise
  const params = use(paramsPromise);  // React.use() で Promise を解決
  const router = useRouter();
  const id = params.id; // これで正しく id を取得できる
  const formRef = useRef();
  const [message, setMessage] = useState("");
  // ... 以降のコードは前回提案したもので基本的にOK ...
  const [customerInfo, setCustomerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setError("Customer ID is missing or not yet available."); // メッセージを少し調整
      return;
    }

    const fetchAndSetCustomer = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const customerData = await fetchCustomer(id);
        if (customerData) {
          setCustomerInfo(customerData);
        } else {
          setError("Customer not found.");
        }
      } catch (err) {
        console.error("Failed to fetch customer:", err);
        setError("Failed to load customer data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetCustomer();
  }, [id]); // id が解決された後に useEffect が実行されるように

  // ... (handleSubmit, ローディング・エラー表示、フォームのJSXは前回の提案通り) ...

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    await updateCustomer(formData);
    setMessage("✅ 更新しました");
    try {
      await updateCustomer(formData);
      router.push(`/customers/${formData.get("customer_id")}/confirm`);
    } catch (err) {
      console.error("Failed to update customer:", err);
      alert(`更新に失敗しました: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading customer data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!customerInfo) {
     return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Customer data not available.</p>
      </div>
    );
  }

  const previous_customer_name = customerInfo.customer_name || "";
  const previous_customer_id = customerInfo.customer_id || "";
  const previous_age = customerInfo.age || "";
  const previous_gender = customerInfo.gender || "";

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4 mx-auto">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              <h2 className="card-title mb-4">
                <p className="flex items-center">
                  <input
                    type="text"
                    name="customer_name"
                    defaultValue={previous_customer_name}
                    className="input input-bordered w-full"
                    required
                  />
                  <span className="ml-2">さん</span>
                </p>
              </h2>
              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text">Customer ID:</span>
                </label>
                <input
                  type="text"
                  name="customer_id"
                  defaultValue={previous_customer_id}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>
              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text">Age:</span>
                </label>
                <input
                  type="number"
                  name="age"
                  defaultValue={previous_age}
                  className="input input-bordered w-full"
                  min="0"
                  required
                />
              </div>
              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text">Gender:</span>
                </label>
                <input
                  type="text"
                  name="gender"
                  defaultValue={previous_gender}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary m-4 text-2xl">
                更新
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}