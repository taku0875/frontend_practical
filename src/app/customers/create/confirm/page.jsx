import { Suspense } from "react";
import ConfirmClient from "./ConfirmClient"; // クライアントロジック分離済み

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <ConfirmClient />
    </Suspense>
  );
}
