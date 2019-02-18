import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'bible';


  ngOnInit(): void {

    window.sessionStorage.setItem('VERSION_DEFAULT', '2');

    $(document).ready(function () {
      $(".side-nav .side-nav-menu li a").on("click", function (e) {
        $(this).parent().hasClass("open") ? $(this).parent().children(".dropdown-menu").slideUp(500, function () {
          $(this).parent().removeClass("open")
        }) : ($(this).parent().parent().children("li.open").children(".dropdown-menu").slideUp(500), $(this).parent().parent().children("li.open").children("a").removeClass("open"), $(this).parent().parent().children("li.open").removeClass("open"), $(this).parent().children(".dropdown-menu").slideDown(500, function () {
          $(this).parent().addClass("open")
        }))
      });

      $(".side-nav-toggle").on("click", function (e) {
        $(".app").toggleClass("is-collapsed"), e.preventDefault()
      });

      $(".side-panel-toggle").on("click", function (e) {
        $(".side-panel").toggleClass("side-panel-open"), e.preventDefault()
      });

      $(".chat-toggle").on("click", function (e) {
        $(".chat").toggleClass("open"), e.preventDefault()
      });

      $(".todo-toggle").on("click", function (e) {
        $(".todo-wrapper").toggleClass("open"), e.preventDefault()
      });

      $(".search-toggle").on("click", function (e) {
        $(".search-box, .search-input").toggleClass("active"), $(".search-input input").focus(), e.preventDefault()
      });

      $(".search-input input").on("keyup", function () {
        $(this).val().length > 0 ? $(".advanced-search").addClass("active") : $(".advanced-search").removeClass("active"), $(".serach-text-bind").html($(this).val())
      });

      $(".theme-toggle, .config-close").on("click", function (e) {
        $(".theme-configurator").toggleClass("theme-config-open"), e.preventDefault()
      });

      $("[data-toggle=card-refresh]").on("click", function (e) {
        var cardRefreshSelector = $(this).parents(".card");
        cardRefreshSelector.addClass("card-refresh"), window.setTimeout(function () {
          cardRefreshSelector.removeClass("card-refresh")
        }, 2e3), e.preventDefault(), e.stopPropagation()
      }), $("[data-toggle=card-delete]").on("click", function (e) {
        var cardDeleteSelector = $(this).parents(".card");
        cardDeleteSelector.addClass("animated zoomOut"), cardDeleteSelector.bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
          cardDeleteSelector.remove()
        }), e.preventDefault(), e.stopPropagation()
      });

    });
  }
}
