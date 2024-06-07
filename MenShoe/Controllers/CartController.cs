using MenShoe.Dao;
using MenShoe.EF;
using MenShoe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MenShoe.Controllers
{
    public class CartController : Controller
    {

        MenShoeEntities db = new MenShoeEntities();
        // GET: Cart
        public ActionResult Index()
        {
            return View();
        }

        //get list cart from sesson["cart"]
        public List<Cart> GetCart()
        {
            List<Cart> lstCart = Session["Cart"] as List<Cart>;
            if (lstCart == null)
            {
                lstCart = new List<Cart>();
                Session["Cart"] = lstCart;
            }
            return lstCart;
        }

        public ActionResult AddToCart(FormCollection f)
        {
            string m_ProductID = "", m_Size = "" , m_color = "" , strURL = "" ;
            m_ProductID = f["productID"].ToString();
            m_Size = f["ddlSize"].ToString();
            m_color = f["productColor"].ToString();
            strURL = f["strURL"].ToString();
            //string m_ProductID, string m_Size, string m_color, string strURL;

            Product prd = db.Products.SingleOrDefault(p => p.ProductID.ToString() == m_ProductID);

            //get sizename
            Size size = db.Sizes.FirstOrDefault(s => s.SizeID.ToString() == m_Size);

            if (prd == null)
            {
                return RedirectToAction("Error","Error");
            }

            List<Cart> lstCart = GetCart();
            Cart crtProduct = lstCart.Find(m => m.m_Id_Product.ToString() == m_ProductID && m.m_Size == size.Number.ToString());
            if(crtProduct == null)
            {
                crtProduct = new Cart(m_ProductID, size.Number.ToString(), m_color);
                lstCart.Add(crtProduct);
                return Redirect(strURL);
            }
            else
            {
                crtProduct.m_Quanlity++;
                return Redirect(strURL);
            }
        }


        private int Quanlity_Total()
        {
            int total = 0;
            List<Cart> lstCart = Session["Cart"] as List<Cart>;
            if (lstCart != null)
            {
                total = lstCart.Sum(c => c.m_Quanlity);
            }
            return total;
        }

        private double Money_Total()
        {
            double money = 0;
            List<Cart> lstCart = Session["Cart"] as List<Cart>;
            if (lstCart != null)
            {
                money = lstCart.Sum(m => m.m_Total);
            }
            return money;
        }


        public ActionResult CartPartial()
        {
            if (Quanlity_Total() == 0)
            {
                return PartialView();
            }
            else
            {
                ViewBag.Quanlity_Total = Quanlity_Total();
                ViewBag.Money_Total = Money_Total();
                return PartialView();
            }
        }

        public ActionResult Cart()
        {
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            ViewBag.Quanlity_Total = Quanlity_Total();

            if(Session["Cart"] == null)
            {
                return RedirectToAction("EmptyCart");
            }

            List<Cart> lstCart = GetCart();
            double money_Total = 0;
            for (int i = 0; i < lstCart.Count(); i++)
            {
                money_Total += lstCart[i].m_Total;
            }
            ViewBag.money_Total = money_Total.ToString();
            return View(lstCart);   
        }

        public ActionResult UpdateCartView()
        {
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            if (Session["Cart"] == null)
            {
                return RedirectToAction("EmptyCart");
            }

            List<Cart> lstCart = GetCart();
            double money_Total = 0;
            for (int i = 0; i < lstCart.Count(); i++)
            {
                money_Total += lstCart[i].m_Total;
            }
            ViewBag.money_Total = money_Total.ToString();
            return View(lstCart);
        }

        public ActionResult UpdateCart(string m_Id_Product, string m_size, FormCollection form)
        {
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            Product prd = db.Products.SingleOrDefault(p => p.ProductID.ToString() == m_Id_Product);
            if (prd == null)
            {
                return RedirectToAction("Error", "Error");
            }
            else
            {
                List<Cart> lstCart = GetCart();
                Cart cartProdcut = lstCart.SingleOrDefault(p => p.m_Id_Product == m_Id_Product && p.m_Size == m_size);
                if (cartProdcut != null)
                {
                    cartProdcut.m_Quanlity = int.Parse(form["txtQuanlity"].ToString());
                }
                else
                {
                    return RedirectToAction("Error", "Error");
                }
                return RedirectToAction("Cart");
            }
        }

        public ActionResult DeleteCart(string Id_Product, string size)
        {
            Product prd = db.Products.SingleOrDefault(p => p.ProductID.ToString() == Id_Product);
            if (prd == null)
            {
                return RedirectToAction("Error", "Error");
            }
            else
            {
                List<Cart> lstCart = GetCart();
                Cart crtProduct = lstCart.SingleOrDefault(p => p.m_Id_Product == Id_Product && p.m_Size == size);
                if (crtProduct != null)
                {
                    lstCart.RemoveAll(p => p.m_Id_Product == Id_Product && p.m_Size == size);
                }
                else
                {
                    return RedirectToAction("Error", "Error");
                }
                if (lstCart.Count() == 0)
                {
                    Session["Cart"] = null;
                    return RedirectToAction("Index", "Home");
                }
                return RedirectToAction("Cart");
            }
        }

        public ActionResult DeleteAll()
        {
            Session["Cart"] = null;
            return RedirectToAction("Cart");
        }

        //Check out cart
        public ActionResult CheckOutCart()
        {
            try
            {
                //check Customer login
                if (Session["IdCustomer"] == null || Session["IdCustomer"].ToString() == "")
                {
                    return RedirectToAction("CustomerLogin", "Customer");
                }

                //check quanlity product in cart = 0
                if (Session["Cart"] == null)
                {
                    return RedirectToAction("EmptyCart");
                }

                Order or = new Order();
                OrderDao odDao = new OrderDao();
                Customer us = (Customer)Session["Customer"];

                List<Cart> lstCart = GetCart();

                or.CustomerID = us.CustomerID;
                or.CreatedDate = DateTime.Now;
                or.Status = 0;
                or.ShipName = us.Name;
                or.ShipEmail = us.Email;
                or.ShipMobile = us.Mobile;
                or.ShipAdress = us.Address;
                db.Orders.Add(or);
                
                foreach (var item in lstCart)
                {
                    OrderDetail orD = new OrderDetail();
                    orD.ProductID = long.Parse(item.m_Id_Product);
                    orD.Quanlity = item.m_Quanlity;
                    orD.Price = (decimal)item.m_Price;
                    orD.ColorID = db.Colors.FirstOrDefault(c => c.NameColor.ToString() == item.m_Color.ToString()).ColorID;
                    orD.SizeID = db.Sizes.FirstOrDefault(s => s.Number.ToString() == item.m_Size).SizeID;
                    orD.OrderID = odDao.getLastID() + 1 ;
                    db.OrderDetails.Add(orD);
                }

                db.SaveChanges();
                Session["Cart"] = null;
                return RedirectToAction("CheckOutSuccess", "Cart");
            }
            catch(Exception ex)
            {
                Console.Write(ex.Message);
                return null;
            }
            
        }


        public ActionResult EmptyCart()
        {
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            return View();
        }

        public ActionResult CheckOutSuccess()
        {
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            return View();
        }
        

    }
}