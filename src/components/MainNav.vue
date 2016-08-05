<template>
	<nav id="main-nav" class="navbar navbar-inverse">
		<div class="container">
	    <div class="navbar-header">
	      <a class="navbar-brand" href="#">Big League</a>
	    </div>
	    <div id="navbar" class="collapse navbar-collapse">
	     	<ul class="nav navbar-nav">
	        <li v-for="tab in tabs" :class="{ 'active': tab.active }">
						<a href="javascript:;" @click="onSetTab(tab)">{{tab.text}}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      tabs: [
        { text: 'Home', active: true },
        { text: 'About', active: false },
      ],
    };
  },
  methods: {
    onSetTab(tab) {
      this.tabs.forEach((item) => {
        item.active = false;
      });
      tab.active = true;
    },
  },
};

</script>

<style scoped>

</style>