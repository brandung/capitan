<!--
 Capitan forms v1.0.0

 Copyright brandung GmbH & Co.KG
 http://www.brandung.de/

 Date: 2015-05-27
 MIT License (MIT)
 -->
<form method="get" action="#">
	<h4 class="util-h4">Input types</h4>
	<p>Allowed/Styled: text, email, number, password, tel, url, date, search</p>
	<div class="row">
		<div class="input-box col-xs-12">
			<label for="">Deine Eingabe</label>
			<input type="text" name="foo" value="" title="Deine Eingabe" placeholder="Deine Eingabe" />
		</div>
	</div>
	<div class="row">
		<div class="input-box col-xs-6">
			<input type="radio" id="radio1" name="radio-input" value="1" />
			<label for="radio1">Auswahl mit sehr langem Text</label>
		</div>
		<div class="input-box col-xs-6">
			<input type="radio" id="radio2" name="radio-input" value="2" />
			<label for="radio2">Auswahl mit noch viel längerem Text</label>
		</div>
	</div>
	<div class="row">
		<div class="input-box col-xs-12">
			<input type="checkbox" id="checkbox1" name="checkbox-input" value="1" />
			<label for="checkbox1">Auswahl mit sehr langem Text</label>
		</div>
	</div>
	<div class="row">
		<div class="input-box input-check col-xs-12">
			<label for="checkbox1">Bitte Land wählen</label>
			<select name="country">
				<option value="">Bitte wählen</option>
				<option value="">Deutschland</option>
				<option value="">Französisch Guyana</option>
			</select>
		</div>
	</div>
	<div class="row">
		<div class="input-box col-xs-12">
			<label for="">Deine Eingabe</label>
			<textarea name="foo" title="Deine Eingabe" placeholder="Deine Eingabe"></textarea>
		</div>
	</div>

	<h4 class="util-h4">Error states</h4>
	<div class="row">
		<div class="input-box col-xs-12">
			<label for="">Deine Eingabe</label>
			<input type="text" name="foo" value="" title="Deine Eingabe" placeholder="Deine Eingabe" class="error" />
		</div>
	</div>
	<div class="row">
		<div class="input-box col-xs-6">
			<input type="radio" id="radio1" name="radio-input" class="error" value="1" />
			<label for="radio1">Auswahl mit sehr langem Text</label>
		</div>
		<div class="input-box col-xs-6">
			<input type="radio" id="radio2" name="radio-input" class="error" value="2" />
			<label for="radio2">Auswahl mit noch viel längerem Text</label>
		</div>
	</div>
	<div class="row">
		<div class="input-box col-xs-12">
			<input type="checkbox" id="checkbox1" name="checkbox-input" class="error" value="1" />
			<label for="checkbox1">Auswahl mit sehr langem Text</label>
		</div>
	</div>
	<div class="row">
		<div class="input-box input-check col-xs-12">
			<label for="checkbox1">Bitte Land wählen</label>
			<select name="country" class="error">
				<option value="">Bitte wählen</option>
				<option value="">Deutschland</option>
				<option value="">Französisch Guyana</option>
			</select>
		</div>
	</div>
	<div class="row">
		<div class="input-box col-xs-12">
			<label for="">Deine Eingabe</label>
			<textarea name="foo" title="Deine Eingabe" placeholder="Deine Eingabe" class="error"></textarea>
		</div>
	</div>

	<h4 class="util-h4">Grid</h4>
	<div class="row">
		<div class="input-box col-xs-6">
			<label for="">Deine Eingabe</label>
			<input type="text" name="bar" value="" title="Deine Eingabe" placeholder="Deine Eingabe" />
		</div>
		<div class="input-box col-xs-6">
			<label for="">Deine Eingabe</label>
			<input type="text" name="baz" value="" title="Deine Eingabe" placeholder="Deine Eingabe" />
		</div>
	</div>
	<div class="row">
		<div class="input-box col-xs-8">
			<label for="">Strasse</label>
			<input type="text" name="bar" value="" title="Strasse" placeholder="Strasse" />
		</div>
		<div class="input-box col-xs-4">
			<label for="">Hausnr.</label>
			<input type="text" name="baz" value="" title="Hausnr." placeholder="Hausnr." />
		</div>
	</div>
	<div class="row">
		<div class="input-box col-xs-2">
			<label for="">PlZ</label>
			<input type="text" name="bar" value="" title="PLZ" placeholder="PLZ" />
		</div>
		<div class="input-box col-xs-4">
			<label for="">Ort</label>
			<input type="text" name="baz" value="" title="Ort" placeholder="Ort" />
		</div>
		<div class="input-box col-xs-6">
			<label for="">Land</label>
			<input type="text" name="baz" value="" title="Land" placeholder="Land" />
		</div>
	</div>
</form>