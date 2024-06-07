using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MenShoe.EF;
using PagedList.Mvc;
using PagedList;


namespace MenShoe.Areas.Admin.Controllers
{
    public class UserController : Controller
    {
        MenShoeEntities db = new MenShoeEntities();

        // GET: Admin/User
        public ActionResult Index(int? page)
        {
            if(Session["IdAdmin"] == null)
            {
                return RedirectToAction("Error","Error");
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;
            return View(db.Users.OrderBy(u=>u.Name).ToPagedList(pageNumber, pageSize));
        }

        /*
        * Detail user
        */

        public ActionResult DetailUser(string id)
        {
            User us = db.Users.FirstOrDefault(u => u.UserID.ToString() == id);
            if(us == null)
            {
                return RedirectToAction("Error","Error");
            }
            return View(us);
        }

        [HttpPost]
        public ActionResult UpdateUser(FormCollection f)
        {
            string username = f["UserName"].ToString();
            User us = db.Users.FirstOrDefault(u => u.UserName == username);
            if(us == null)
            {
                return RedirectToAction("Error", "Error");
            }

            us.Name = f["Name"].ToString();
            us.Email = f["Email"].ToString();
            us.Address = f["Address"].ToString();
            us.Mobile = f["Mobile"].ToString();
            us.Status = bool.Parse(f["status"]);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult DeleteUser(string ID)
        {
            User us = db.Users.FirstOrDefault(u => u.UserID.ToString() == ID);
            if(us == null)
            {
                return RedirectToAction("Error","Error");
            }

            db.Users.Remove(us);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}