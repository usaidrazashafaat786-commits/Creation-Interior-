import React from "react";
import { Order } from "../types";
import { ListTodo, Calendar, Clock, Landmark, PhoneCall, MapPin, CheckCircle, Truck, RefreshCw } from "lucide-react";

interface OrderHistoryProps {
  orders: Order[];
  onRefresh?: () => void;
}

export default function OrderHistory({ orders, onRefresh }: OrderHistoryProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400";
      case "Dispatched":
        return "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400";
      case "Delivered":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400";
      default:
        return "bg-red-500/10 border-red-500/20 text-red-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-3.5 h-3.5" />;
      case "Dispatched":
        return <Truck className="w-3.5 h-3.5 animate-bounce" />;
      case "Delivered":
        return <CheckCircle className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div id="order_history_section" className="space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <ListTodo className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50 font-serif">
            Purchase History
          </h3>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Refesh list</span>
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 rounded-3xl">
          <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
            No previous transactions detected on this account.
            <br />
            Select an item, complete your delivery address, and trigger an checkout order on WhatsApp to test order logging!
          </p>
        </div>
      ) : (
        <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
          {orders.map((order) => {
            const date = new Date(order.timestamp).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });

            return (
              <div
                key={order.orderId}
                id={`receipt_order_${order.orderId}`}
                className="p-5 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-2xl shadow-sm text-xs space-y-4"
              >
                
                {/* Header row metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <span className="font-mono text-zinc-400 text-[10px]">ORDER ID: <code>{order.orderId}</code></span>
                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-450" />
                      <span>{date}</span>
                    </div>
                  </div>

                  {/* Status pills badges */}
                  <span className={`px-3 py-1 border rounded-lg flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] ${getStatusStyle(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>

                {/* Items rows nested details */}
                <div className="space-y-1.5">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-zinc-700 dark:text-zinc-300">
                      <span>{item.productName} <strong className="text-zinc-400">× {item.quantity}</strong></span>
                      <span className="font-semibold text-zinc-850 dark:text-zinc-150">₹ {(item.unitPrice * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>

                {/* Footer contact info address lines */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 flex flex-col md:flex-row justify-between gap-2.5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{order.deliveryPhone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="line-clamp-1">{order.deliveryAddress}</span>
                    </div>
                  </div>

                  <div className="text-right flex flex-row md:flex-col justify-between items-end gap-1 font-serif md:text-right border-t md:border-t-0 pt-2.5 md:pt-0 border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-400 uppercase tracking-widest text-[9px] block">Grand Total:</span>
                    <strong className="text-sm font-sans tracking-tight font-black text-amber-600 dark:text-amber-400">
                      ₹ {order.totalPrice.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
