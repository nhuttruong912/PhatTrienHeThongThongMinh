using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MenShoe.EF;
using PagedList;
using MenShoe.Dao;

namespace MenShoe.Controllers
{
    public class SearchController : Controller
    {
        MenShoeEntities db = new MenShoeEntities();
        // GET: Search
        
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult SearchResult(FormCollection f, int?page)
        {
            SearchDao searchDao = new SearchDao();
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            string searchString = f["txtSearch"].ToString();
            if(searchString == "")
            {
                return RedirectToAction("Index","Home");
            }
            string lbgroup = f["lbgroup"].ToString();
            List<Product> lstProduct = new List<Product>();
            if (lbgroup == "0")
            {
                lstProduct = searchDao.searchAll(searchString);
            }
            else if(lbgroup == "1")
            {
                lstProduct = searchDao.searchProduct(searchString);
            }
            else if(lbgroup == "3")
            {
                lstProduct = searchDao.searchCategory(searchString);
            }
            else
            {
                return RedirectToAction("searchNull");
            }

            ViewBag.searchString = searchString;

            int pageNumber = (page ?? 1);
            int pageSize = 18;
            
            if(lstProduct.Count() == 0)
            {
                return RedirectToAction("searchNull");
            }

            ViewBag.result = lstProduct.Count() + " items matched your search for "+ searchString;

            return View(lstProduct.OrderBy(p=>p.Price).ToPagedList(pageNumber, pageSize));
        }

        public ViewResult searchNull()
        {
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            return View();
        }
    }
}