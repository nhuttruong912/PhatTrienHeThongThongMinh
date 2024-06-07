using MenShoe.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using System.IO;
using MenShoe.Dao;

namespace MenShoe.Areas.Admin.Controllers
{
    public class ProductController : Controller
    {
        // GET: Admin/Product
        MenShoeEntities db = new MenShoeEntities();
        public ActionResult Index(int? page)
        {
            if (Session["IdAdmin"] == null)
            {
                return RedirectToAction("LoginAdmin", "LoginAdmin");
            }
            int pageSize = 5;
            int pageNumber = page ?? 1;
            List<Product> lstProduct = db.Products.ToList();
            
            return View(db.Products.OrderBy(u => u.Name).ToPagedList(pageNumber, pageSize));
        }

        [HttpGet]
        public ActionResult UpdateProduct(string ID)
        {
            if (Session["IdAdmin"] == null)
            {
                return RedirectToAction("LoginAdmin", "LoginAdmin");
            }
            if (string.IsNullOrEmpty(ID))
            {
                return RedirectToAction("Error","Error");
            }
            Product prd = db.Products.FirstOrDefault(p => p.ProductID.ToString() == ID);
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.ToList();
            return View(prd);
        }

        [HttpPost]
        public ActionResult UpdateProduct(FormCollection f)
        {
            if(ModelState.IsValid)
            {
                string id = f["ID"].ToString();
                Product product = db.Products.FirstOrDefault(p => p.ProductID.ToString() == id);
                if (product != null)
                {
                    product.Name = f["Name"].ToUpper().ToString();
                    product.Price = decimal.Parse(f["Price"]);
                    product.PromotionPrice = decimal.Parse(f["PromotionPrice"]);
                    product.Detail = f["Detail"].ToString();
                    product.CategoryID = long.Parse(f["Category"]);
                    product.ProductCategoryID = long.Parse(f["ProductCategory"]);
                    product.Warranty = int.Parse(f["Warranty"]);
                    product.ModifiedDate = DateTime.Now;
                    product.ModifiedBy = Session["UserNameAdmin"].ToString();
                    product.New = f["New"] == "True" ? true : false;
                    db.SaveChanges();
                    return RedirectToAction("UpdateProduct");
                }
                return RedirectToAction("Error", "Error");

            }
            return RedirectToAction("Error", "Error");
        }


        [HttpGet]
        public ActionResult CreateProduct()
        {
            if (Session["IdAdmin"] == null)
            {
                return RedirectToAction("LoginAdmin", "LoginAdmin");
            }
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.ToList();
            ViewBag.Color = db.Colors.ToList();
            ViewBag.Size = db.Sizes.ToList();
            return View();
        }

        [HttpPost]
        public ActionResult CreateProduct(FormCollection f, HttpPostedFileBase file, IEnumerable<HttpPostedFileBase> files)
        {
            if(ModelState.IsValid)
            {
                ProductDao productDAO = new ProductDao();
                Product product = new Product();
                product.Name = f["Name"].ToUpper().ToString();
                product.Price = decimal.Parse(f["Price"]);
                product.PromotionPrice = product.Price;
                product.Detail = f["Detail"].ToString();
                product.Quantity = f["Quantity"] == "" ? 0 : int.Parse(f["Quantity"]);
                product.CategoryID = long.Parse(f["Category"]);
                product.ProductCategoryID = long.Parse(f["ProductCategory"]);
                product.Warranty = int.Parse(f["Warranty"]);
                product.CreatedDate = DateTime.Now;
                product.CreatedBy = Session["UserNameAdmin"].ToString();
                product.New = f["New"] == "1" ? true : false;

                string filename = "";
                if(file != null && file.ContentLength > 0)
                {
                    filename = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/ProductImage"), filename);
                    file.SaveAs(path);
                }
                product.Image = "ProductImage" + "/" + filename;
                db.Products.Add(product);


                //get max product_id
                long maxid = productDAO.getMaxIdProduct() + 1;

                //add data table product_color
                Product_Color productcolor = new Product_Color();
                productcolor.ProductID = maxid;
                productcolor.ColorID = int.Parse(f["Color"]);
                db.Product_Color.Add(productcolor);

                //add data table product_size
                Product_Size productsize = new Product_Size();
                productsize.ProductID = maxid;
                productsize.SizeID = int.Parse(f["Size"]);
                db.Product_Size.Add(productsize);

                //add data table product_image
                
                foreach (var file1 in files)
                {
                    ProductImage productimage = new ProductImage();
                    if (file1 != null && file1.ContentLength > 0)
                    {
                        filename = Path.GetFileName(file1.FileName);
                        var path = Path.Combine(Server.MapPath("~/ProductImage"), filename);
                        file1.SaveAs(path);
                        productimage.ProductID = maxid;
                        productimage.ImageDetail = "ProductImage" + "/" + filename;
                    }
                    db.ProductImages.Add(productimage);
                }

                db.SaveChanges();

                return RedirectToAction("Index");
            }
            return null;
        }


        public ActionResult DeleteProduct(string ID)
        {
            Product product = db.Products.FirstOrDefault(p => p.ProductID.ToString() == ID);
            if(product != null)
            {
                db.Products.Remove(product);
                return RedirectToAction("Index");
            }
            return RedirectToAction("Error", "Error");
        }


    }
}