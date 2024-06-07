using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MenShoe.EF;
using MenShoe.Common;

namespace MenShoe.Areas.Admin.Controllers
{
    public class LoginAdminController : Controller
    {
        MenShoeEntities db = new MenShoeEntities();

        // GET: Admin/LoginAdmin
        public ActionResult Index()
        {
            if (Session["IdAdmin"] == null)
            {
                return RedirectToAction("LoginAdmin");
            }
            return View();
        }

        [HttpGet]
        public ActionResult LoginAdmin()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LoginAdmin([Bind(Include = "UserName,Password")] User loginForm)
        {
            try
            {
                int i = db.Users.Count();
                User user = db.Users.FirstOrDefault(u => u.UserName == loginForm.UserName);
                if (user == null)
                {
                    ViewBag.loginFail = "Tên đăng nhập hoặc mật khẩu không đúng";
                    return View();
                }
                else
                {
                    if (user.Password == Encryptor.MD5Hash(loginForm.Password) && user.Status == true)
                    {
                        Session["IdAdmin"] = user.UserID;
                        Session["UserNameAdmin"] = user.UserName;
                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        ViewBag.loginFail = "Tên đăng nhập hoặc mật khẩu không đúng";
                        return View();
                    }
                }

            }
            catch (Exception ex)
            {
                return View();

            }

        }

        public ActionResult LogoutAdmin()
        {
            Session["IdAdmin"] = null;
            return RedirectToAction("LoginAdmin");
        }


    }
}