<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
/*字体大小设定 */
@media (max-width: 1400px) {
	html {
		font-size: 32px;
	}
}
@media (max-width: 1200px) {
	html {
		font-size: 30px;
	}
}
@media (max-width: 992px) {
	html {
		font-size: 25px;
	}
}
@media (max-width: 768px) {
	html {
		font-size: 20px;
	}
}
@media (max-width: 460px) {
	html {
		font-size: 12px;
	}
}
@media (max-width: 375px) {
	html {
		font-size: 10px;
	}
}
</style>
