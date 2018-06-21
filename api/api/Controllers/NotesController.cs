using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using System.Xml.Serialization;
using System.Xml.Linq;

namespace api.Controllers
{
    [Route("api/notes")]
    public class HomeController : Controller
    {

        private List<Note> GetList()
        {
            XElement notes = XElement.Load("./Models/Notes.xml");
            List<Note> list = new List<Note>();

            foreach (var note in notes.Elements("Note"))
            {
                var note1 = new Note()
                {
                    Id = Int32.Parse(note.Attribute("id")?.Value),
                    Title = note.Attribute("title")?.Value,
                    Text = note.Attribute("text")?.Value,
                    Date = note.Attribute("date")?.Value
                };
                list.Add(note1);
            }
            return list;
        }

        private void AddToList(Note noteNew)
        {
            XDocument doc = XDocument.Load("./Models/Notes.xml");
            XElement note = new XElement("Note",
                new XAttribute("id", noteNew.Id),
                new XAttribute("title", noteNew.Title),
                new XAttribute("text", noteNew.Text),
                new XAttribute("date", noteNew.Date)
            );
            doc.Root.Add(note);
            doc.Save("./Models/Notes.xml");
        }

        [HttpGet]
        public List<Note> GetAll()
        {
            return GetList();
        }

        [HttpGet("{id}")]
        public Note Get(int id)
        {
            var list = GetList();
            return (Note) list.FirstOrDefault(note => note.Id == id);
        }

        [HttpGet("{title}")]
        public Note Get(string title)
        {
            var list = GetList();
            return  (Note) list.FirstOrDefault(note => note.Title == title);
        }

        [HttpPost]
        public Note Insert([FromBody]Note note)
        {
            Console.Write(HttpContext.Request.Body);
            AddToList(note);
            return note;
        }

        [HttpDelete("{id}")]
        public void  Delete(int id)
        {
            XDocument doc = XDocument.Load("./Models/Notes.xml");
            var q = from node in doc.Descendants("Note")
                let attr = node.Attribute("id")
                where attr != null && Int32.Parse(attr.Value) == id
                select node;
            q.ToList().ForEach(x => x.Remove());
            doc.Save("./Models/Notes.xml");
           
        }

        [HttpPut("{title}")]
        public void Update([FromBody]Note note)
        {
            var noteId = note.Id;
            XDocument doc = XDocument.Load("./Models/Notes.xml");
            var q = from node in doc.Descendants("Note")
                let attr = node.Attribute("id")
                where attr != null && Int32.Parse(attr.Value) == noteId
                select node;
            q.FirstOrDefault().Attribute("title").Value = note.Title;
            q.FirstOrDefault().Attribute("text").Value = note.Text;

            doc.Save("./Models/Notes.xml");
        }
    }
}
