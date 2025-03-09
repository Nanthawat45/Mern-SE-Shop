import { useEffect, useState } from "react";
import OrderServices from "../../services/order.service";

import { RiInfoCardLine, RiDeleteBin7Fill } from "react-icons/ri";
import { PiMagnifyingGlass } from "react-icons/pi";
import Swal from "sweetalert2";
import ModalOrder from "../../components/ModalOrder";

import { Select, Table, Button, Modal, message } from "antd";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await OrderServices.getOrders();
      setOrders(response.data);
    } catch (error) {
      message.error("Failed to load orders");
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await OrderServices.updateOrder(id, { deliveryStatus: status });
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, deliveryStatus: status } : order))
      );
      message.success("Order status updated");
    } catch (error) {
      message.error("Failed to update order status");
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this order?",
      onOk: async () => {
        try {
          await OrderServices.deleteOrder(id);
          setOrders((prev) => prev.filter((order) => order.id !== id));
          message.success("Order deleted");
        } catch (error) {
          message.error("Failed to delete order");
        }
      },
    });
  };

  const columns = [
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      render: (text, record) => (
        <Select
          value={record.deliveryStatus}
          onChange={(value) => handleStatusChange(record.id, value)}
          options={[
            { value: "Pending", label: "Pending" },
            { value: "Processing", label: "Processing" },
            { value: "Shipped", label: "Shipped" },
            { value: "Delivered", label: "Delivered" },
          ]}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button onClick={() => message.info(`Viewing details of order ${record.id}`)}>Order Details</Button>
          <Button danger onClick={() => handleDelete(record.id)} style={{ marginLeft: 10 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={orders} rowKey="id" loading={loading} />;
};

export default ManageOrders;