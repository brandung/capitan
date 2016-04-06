{# Capitan HTML template v1.0.0 #}

	{# head.tpl #}
	{% include "./partials/head.tpl" %}

	<body>

		{# browsehappy.tpl #}
		{% include "../../component/browsehappy/browsehappy.tpl" %}

		{# noscript.tpl #}
		{% include "../../component/noscript/noscript.tpl" %}

		<div data-role="sg" data-type="sg__section" data-name="0. Header" data-headline="hidden">
			{# header.tpl #}
			{% include "../../component/header/header.tpl" %}
		</div>

		<main id="main" role="main">

			<div data-role="sg" data-type="sg__section" data-name="1. Colors">
				{# colors.tpl #}
				{% include "./partials/colors.tpl" %}
			</div>


			<div data-role="sg" data-type="sg__section" data-name="2. Icons">
				{# icons.tpl #}
				{% include "./partials/icons.tpl" %}
			</div>


			<div data-role="sg" data-type="sg__section" data-name="3. Breakpoints">
				<div class="row" style="overflow-x: auto">
					{# breakpoints.tpl #}
					{% include "./partials/breakpoints.tpl" %}
				</div>
			</div>


			<div data-role="sg" data-type="sg__section" data-name="4. Grid">
				{# grid.tpl #}
				{% include "./partials/grid.tpl" %}
			</div>


			<div data-role="sg" data-type="sg__section" data-name="5. Typo Elements">
				{# typo.tpl #}
				{% include "./partials/typo.tpl" %}
			</div>


			<div data-role="sg" data-type="sg__section" data-name="6. Components">

				<div data-role="sg" data-type="sg__component" data-name="Alert">
					{# alert.tpl #}
					{% include "../../component/alert/alert.tpl" %}
				</div>

				<div data-role="sg" data-type="sg__component" data-name="Buttons">
					{# buttons.tpl #}
					{% include "../../component/buttons/buttons.tpl" %}
				</div>

				<div data-role="sg" data-type="sg__component" data-name="Forms">
					{# forms.tpl #}
					{% include "../../component/forms/forms.tpl" %}
				</div>

				<!-- <@newComponent@> -->

			</div>
		</main>

		<div data-role="sg" data-type="sg__section" data-name="0. Footer" data-headline="hidden">
			{# footer.tpl #}
			{% include "../../component/footer/footer.tpl" %}
		</div>

		{# jsfooter.tpl #}
		{% include "./partials/jsfooter.tpl" %}

	</body>
</html>
