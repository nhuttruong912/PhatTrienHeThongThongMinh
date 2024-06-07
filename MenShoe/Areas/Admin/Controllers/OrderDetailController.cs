using MenShoe.Areas.Admin.Models;
using MenShoe.Dao;
using MenShoe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MenShoe.Areas.Admin.Controllers
{
    public class OrderDetailController : Controller
    {
        // GET: Admin/OrderDeltai
        public ActionResult Index()
        {
            return View();
        }

        private double Money_Total(List<CartView> lstCart)
        {
            double money = 0;
            if (lstCart != null)
            {
                money = lstCart.Sum(m => m.Total);
            }
            return money;
        }

        public ActionResult OrderDetailViewCart(string OrderID)
        {
            if (Session["IdAdmin"] == null)
            {
                return RedirectToAction("LoginAdmin", "LoginAdmin");
            }
            OrderDao orDao = new OrderDao();
            List<CartView> lstCartView = orDao.getListCartOrder(OrderID);
            ViewBag.Money_Total = Money_Total(lstCartView);
            return PartialView(lstCartView);
        }
    }
}