using MenShoe.Common;
using MenShoe.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MenShoe.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        MenShoeEntities db = new MenShoeEntities();
        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult CustomerLogin()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CustomerLogin([Bind(Include = "UserName,Password")] User loginForm)
        {
            try
            {
                Customer Customer = db.Customers.FirstOrDefault(u => u.UserName.ToString() == loginForm.UserName.ToString());

                if (Customer != null)
                {
                    if (Customer.Password == Encryptor.MD5Hash(loginForm.Password))
                    {
                        Session["IdCustomer"] = Customer.CustomerID;
                        Session["Customer"] = Customer;
                        Session["Name"] = Customer.Name;
                        if (Customer.Status == true)
                        {
                            Session["IdAdmin"] = Customer.CustomerID;
                        }
                        return RedirectToAction("Index", "Home");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
                return null;
            }
            return View();
        }

        public ActionResult CustomerLogOut()
        {
            Session["IdCustomer"] = null;
            Session["Customer"] = null;
            Session["Name"] = null;
            return RedirectToAction("Index", "Home");
        }


        [HttpGet]
        public ActionResult CustomerRegister()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CustomerRegister([Bind(Include = "UserName,Email,Name,Phone,Address,Password")] User registerForm)
        {
            try
            {
                Customer Customer = new Customer();
                Customer.UserName = registerForm.UserName;
                Customer.Password = Encryptor.MD5Hash(registerForm.Password);
                Customer.Name = registerForm.Name;
                Customer.Email = registerForm.Email;
                Customer.Mobile = registerForm.Mobile;
                Customer.Address = registerForm.Address;
                Customer.Status = false;
                Customer.CreatedDate = DateTime.Now;
                db.Customers.Add(Customer);
                db.SaveChanges();
                return RedirectToAction("CustomerLogin");
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Error");
            }
        }

        public ActionResult CustomerDetail(string ID)
        {
            if(string.IsNullOrEmpty(ID))
            {
                return RedirectToAction("Error", "Error");
            }
            ViewBag.ProductCategories = db.ProductCategories.ToList();
            ViewBag.Categories = db.Categories.Take(5).ToList();
            return View();
        }

    }
}