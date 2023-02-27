<template>
  <div class="right-menu">
    <div class="right-menu__search">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="text" placeholder="Search in twitter..." />
    </div>
    <div class="right-menu__trending">
      <div class="right-menu__trending--title">
        <span>Trend for you</span>
      </div>
      <div class="right-menu__trending--content">
        <div class="content">
          <ul>
            <li>Popular topics in Vietnam</li>
            <li><span>Cristiano Ronaldo</span></li>
            <li>35.711 Tweet</li>
          </ul>
        </div>
        <div class="setting">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <div class="right-menu__trending--content">
        <div class="content">
          <ul>
            <li>Popular topics in Vietnam</li>
            <li><span>Football</span></li>
            <li>33.711 Tweet</li>
          </ul>
        </div>
        <div class="setting">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <div class="right-menu__trending--content">
        <div class="content">
          <ul>
            <li>Popular topics in Vietnam</li>
            <li><span>Leo Messi</span></li>
            <li>12.231 Tweet</li>
          </ul>
        </div>
        <div class="setting">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <div class="right-menu__trending--content">
        <div class="content">
          <ul>
            <li>Popular topics in Vietnam</li>
            <li><span>Sơn Tùng MTP</span></li>
            <li>5023 Tweet</li>
          </ul>
        </div>
        <div class="setting">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.right-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  position: sticky;
  top: 30px;
  &__search {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 30px;
    width: 400px;
    height: 44px;
    background-color: #eff3f4;
    border-radius: 20px;

    input {
      margin-left: 25px;
      border: none;
      outline: none;
      background-color: #eff3f4;
    }
  }
  &__trending {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 400px;
    background-color: #f7f9f9;
    height: 100%;
    border-radius: 16px;
    ul li {
      list-style: none;
      margin: 5px;
      line-height: 24px;
      span {
        font-weight: bold;
        font-size: 18px;
        color: black;
      }
    }
    &--title {
      display: inline;
      margin: 10px;
      span {
        color: #0f1419;
        font-size: 20px;
        font-weight: 800;
        line-height: 24px;
      }
    }
    &--content {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin: 10px 0px;
      padding: 5px;
      background-color: #f7f9f9;
      transition: background-color 0.3s linear;
      &:hover {
        cursor: pointer;
        background-color: #f0f2f2;
      }
    }
  }
}
</style>