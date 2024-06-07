using MenShoe.Dao;
using MenShoe.EF;
using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MenShoe.Controllers
{
    public class HomeController : Controller
    {
        MenShoeEntities db = new MenShoeEntities();
        public ActionResult Index(int? page, string searchString)
        {
            int pageSize = 18;
            int pageNumber = page ?? 1;
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            return View(db.Products.Where(p => p.New == true).OrderBy(p => p.Price).ToPagedList(pageNumber, pageSize));
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}