{# Capitan HTML template v1.0.0 #}

	{# head.tpl #}
	{% include "./partials/head.tpl" %}

	<body>

		{# browsehappy.tpl #}
		{% include "../../component/browsehappy/browsehappy.tpl" %}

		{# noscript.tpl #}
		{% include "../../component/noscript/noscript.tpl" %}

		{# header.tpl #}
		{% include "../../component/header/header.tpl" %}

		<main id="main" role="main">

			<h2 class="mw-headline">1. Colors</h2>
			{% include "./partials/colors.tpl" %}

			<hr/>

			<h2 class="mw-headline">2. Icons</h2>
			{% include "./partials/icons.tpl" %}

			<hr/>

			<h2 class="mw-headline">3. Breakpoints</h2>
			<div class="row" style="overflow-x: auto">
				{% include "./partials/breakpoints.tpl" %}
			</div>

			<hr/>

			<h2 class="mw-headline">4. Grid</h2>
			{# grid.tpl #}
			{% include "./partials/grid.tpl" %}

			<hr/>

			<h2 class="mw-headline">5. Typo Elements</h2>
			{# typo.tpl #}
			{% include "./partials/typo.tpl" %}

			<hr/>

			<h2 class="mw-headline">6. Components</h2>

			<h3 class="mw-headline">Alert</h3>
			{# alert.tpl #}
			{% include "../../component/alert/alert.tpl" %}

			<h3 class="mw-headline">Buttons</h3>
			{# buttons.tpl #}
			{% include "../../component/buttons/buttons.tpl" %}

			<h3 class="mw-headline">Forms</h3>
			{# forms.tpl #}
			{% include "../../component/forms/forms.tpl" %}

			<!-- <@newComponent@> -->

			<!-- start|bra-pb: html -->
			<!-- end|bra-pb: html -->
		</main>

		{# footer.tpl #}
		{% include "../../component/footer/footer.tpl" %}

		{# jsfooter.tpl #}
		{% include "./partials/jsfooter.tpl" %}

	</body>
</html>
