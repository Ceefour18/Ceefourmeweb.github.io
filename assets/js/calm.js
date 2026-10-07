(function () {
	var root = document.documentElement;

	// Theme toggle (remembers choice when storage is available)
	try {
		var saved = localStorage.getItem('theme');
		if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
	} catch (e) {}

	document.addEventListener('DOMContentLoaded', function () {
		var toggle = document.getElementById('theme-toggle');
		if (toggle) {
			toggle.addEventListener('click', function () {
				var current = root.getAttribute('data-theme');
				if (!current) {
					current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
				}
				var next = current === 'dark' ? 'light' : 'dark';
				root.setAttribute('data-theme', next);
				try { localStorage.setItem('theme', next); } catch (e) {}
			});
		}

		// Mobile menu
		var menuBtn = document.getElementById('menu-btn');
		var nav = document.getElementById('site-nav');
		if (menuBtn && nav) {
			menuBtn.addEventListener('click', function () {
				var open = nav.classList.toggle('open');
				menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
			});
			nav.addEventListener('click', function (e) {
				if (e.target.tagName === 'A') {
					nav.classList.remove('open');
					menuBtn.setAttribute('aria-expanded', 'false');
				}
			});
		}

		// Header border on scroll
		var header = document.querySelector('.site-header');
		var onScroll = function () {
			if (header) header.classList.toggle('scrolled', window.scrollY > 8);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		// Gentle reveal
		var items = document.querySelectorAll('.reveal');
		if ('IntersectionObserver' in window) {
			var io = new IntersectionObserver(function (entries) {
				entries.forEach(function (en) {
					if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
				});
			}, { rootMargin: '0px 0px -8% 0px' });
			items.forEach(function (el) { io.observe(el); });
		} else {
			items.forEach(function (el) { el.classList.add('in'); });
		}

		// Footer year
		var y = document.getElementById('year');
		if (y) y.textContent = new Date().getFullYear();
	});
})();
