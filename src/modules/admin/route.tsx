import { RouteList } from 'routes/types'

export const adminRoute: RouteList = [
  {
    path: '/admin',
    name: 'Trang chủ',
    icon: 'ant-design:home-filled',
    showOnMenu: true,
    element: <div>Trang chủ</div>,
  },
  {
    path: 'order',
    name: 'Quản lý đơn hàng',
    icon: 'lets-icons:order',
    showOnMenu: true,
    children: [
      {
        path: '/admin/order/list',
        name: 'Tất cả',
        showOnMenu: true,
        element: <div>Danh sách đơn hàng 1</div>,
      },
      {
        path: '/admin/order/create',
        name: 'Đơn hủy',
        showOnMenu: true,
        element: <div>Danh sách đơn hàng 2</div>,
      },
      {
        path: '/admin/order/return',
        name: 'Trả hàng/Hoàn tiền',
        showOnMenu: true,
        element: <div>Danh sách đơn hàng</div>,
      },
    ],
  },
  {
    path: 'category',
    name: 'Quản lý danh mục',
    icon: 'bxs:category',
    showOnMenu: true,
    children: [
      {
        path: '/admin/category/list',
        name: 'Tất cả',
        showOnMenu: true,
        element: <div>Danh sách danh mục</div>,
      },
      {
        path: '/admin/category/create',
        name: 'Thêm danh mục',
        showOnMenu: true,
        element: <div>Tạo danh mục</div>,
      },
    ],
  },
  {
    path: 'product',
    name: 'Quản lý sản phẩm',
    icon: 'bx-shopping-bag',
    showOnMenu: true,
    children: [
      {
        path: '/admin/product/list',
        name: 'Tất cả',
        showOnMenu: true,
        element: <div>Danh sách sản phẩm</div>,
      },
      {
        path: '/admin/product/create',
        name: 'Thêm sản phẩm',
        showOnMenu: true,
        element: <div>Tạo sản phẩm</div>,
      },
      {
        path: '/admin/product/create',
        name: 'Thêm sản phẩm',
        showOnMenu: true,
        element: <div>Tạo sản phẩm</div>,
      },
      {
        path: '/admin/product/create',
        name: 'Thêm sản phẩm',
        showOnMenu: true,
        element: <div>Tạo sản phẩm</div>,
      },
      {
        path: '/admin/product/create',
        name: 'Thêm sản phẩm',
        showOnMenu: true,
        element: <div>Tạo sản phẩm</div>,
      },
      {
        path: '/admin/product/create',
        name: 'Thêm sản phẩm',
        showOnMenu: true,
        element: <div>Tạo sản phẩm</div>,
      },
      {
        path: '/admin/product/create',
        name: 'Thêm sản phẩm',
        showOnMenu: true,
        element: <div>Tạo sản phẩm</div>,
      },
      {
        path: '/admin/product/create',
        name: 'Thêm sản phẩm',
        showOnMenu: true,
        element: <div>Tạo sản phẩm</div>,
      },
      {
        path: '/admin/product/create',
        name: 'Thêm sản phẩm',
        showOnMenu: true,
        element: <div>Tạo sản phẩm</div>,
      },
      {
        path: '/admin/product/create',
        name: 'Thêm sản phẩm',
        showOnMenu: true,
        element: <div>Tạo sản phẩm</div>,
      },
      {
        path: '/admin/product/create',
        name: 'Thêm sản phẩm',
        showOnMenu: true,
        element: <div>Tạo sản phẩm</div>,
      },
      {
        path: '/admin/product/create',
        name: 'Thêm sản phẩm',
        showOnMenu: true,
        element: <div>Tạo sản phẩm</div>,
      },
    ],
  },
]
