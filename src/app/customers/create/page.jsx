import { Suspense } from "react";
import CreateClient from "./CreateClient"; // クライアント側ロジックを分離

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <CreateClient />
    </Suspense>
  );
}
