using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MenShoe.EF;
using PagedList.Mvc;
using PagedList;

namespace MenShoe.Controllers
{
    public class CategoryController : Controller
    {
        // GET: Category
        MenShoeEntities db = new MenShoeEntities();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Category(int? page, string CategoryID)
        {
            int pageSize = 18;
            int pageNumber = page ?? 1;
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            Category ca = db.Categories.SingleOrDefault(p => p.CategoryID.ToString() == CategoryID);
            if (ca == null)
            {
                return RedirectToAction("Error", "Error");
            }
            PagedList.IPagedList<Product> lstProduct = db.Products.Where(p => p.CategoryID.ToString() == CategoryID).OrderBy(p => p.Price).ToPagedList(pageNumber, pageSize);
            if (lstProduct.Count() == 0)
            {
                return RedirectToAction("EmptyProductCategory","ProductCategory");
            }

            ViewBag.ProductCategoryName = ca.Name;
            return View(lstProduct);
        }
    }
}