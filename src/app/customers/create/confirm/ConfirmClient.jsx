"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";

export default function ConfirmClient() {
  const params = useSearchParams();
  const customer_id = params.get("customer_id");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (!customer_id) return;

    const fetchAndSetCustomer = async () => {
      try {
        const customerData = await fetchCustomer(customer_id);
        setCustomer(customerData[0]);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };

    fetchAndSetCustomer();
  }, [customer_id]);

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">正常に作成しました</div>
      {customer && <OneCustomerInfoCard {...customer} />}
      <button onClick={() => window.location.href = "/customers"}>
        <div className="btn btn-primary m-4 text-2xl">戻る</div>
      </button>
    </div>
  );
}
