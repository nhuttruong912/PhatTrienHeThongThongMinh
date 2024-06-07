using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MenShoe.Dao;
using MenShoe.EF;

namespace MenShoe.Areas.Admin.Controllers
{
    public class OrderController : Controller
    {
        MenShoeEntities db = new MenShoeEntities();
        // GET: Admin/Order
        public ActionResult Index()
        {
            if (Session["IdAdmin"] == null)
            {
                return RedirectToAction("LoginAdmin", "LoginAdmin");
            }

            OrderDao odDao = new OrderDao();
            ProductDao prDao = new ProductDao();
            List<Order> lstOd = db.Orders.Where(o => o.Status == 0 || o.Status == 2).ToList();
            List<Int64> lstIdProductSelling = odDao.lstIdPruductSelling();
            ViewBag.lstBestSelling = prDao.lstBestSelling(lstIdProductSelling);
            ViewBag.Amount = odDao.lstAmount(lstOd);
            return View(lstOd);
        }

        public ActionResult OrderDetailView(string ID)
        {
            if (Session["IdAdmin"] == null)
            {
                return RedirectToAction("LoginAdmin", "LoginAdmin");
            }
            if (ID != null)
            {
                Order od = db.Orders.FirstOrDefault(o => o.OrderID.ToString() == ID);
                return View(od);
            }
            return RedirectToAction("Error", "Error");
            
        }

        public int UpdateStatusOrder(string ID)
        {
            if(ID != null)
            {
                Order or = db.Orders.FirstOrDefault(o => o.OrderID.ToString() == ID);
                if (or.Status == 0)
                    or.Status = 2;
                else if (or.Status == 2)
                    or.Status = 1;
                else
                    return 3;
                db.SaveChanges();
                return (int)or.Status;
            }
            return 3;
        }
    }
}