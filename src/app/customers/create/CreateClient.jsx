"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CreateClient() {
  const params = useSearchParams();

  useEffect(() => {
    const customerId = params.get("customer_id");
    console.log("customer_id:", customerId);
    // 必要な処理をここで行う
  }, [params]);

  return <div>作成完了</div>;
}
