import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Inertia } from "@inertiajs/inertia";

export default function ScanQRCode() {
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");

  const handleScan = (result) => {
    if (result && !scanned) {
      setData(result);
      setScanned(true);
      // ไปหน้าเมนูหลังสแกน
      Inertia.visit("/menu");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-red-950 to-red-800 text-white">
      <h1 className="text-4xl font-bold mb-8">📷 สแกน QR Code</h1>
      <div className="w-80 h-80">
        <QrReader
          onResult={(result, error) => {
            if (!!result) handleScan(result?.text);
          }}
          constraints={{ facingMode: "environment" }}
          className="w-full h-full rounded-2xl"
        />
      </div>
      {data && <p className="mt-4 text-green-400">ผลลัพธ์: {data}</p>}
    </div>
  );
}
