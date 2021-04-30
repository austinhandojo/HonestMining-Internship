<template>
  <div class="card card-default box mb-20 no-border card-dashboard-3">
    <div class="card-heading">
      <h3 class="card-title">Miner Rank</h3>
    </div>
    <div class="card-body tab-triple">
      <div class="scroll-box-custom">
        <nav>
          <div 
            id="nav-tab" 
            class="nav nav-tabs" 
            role="tablist">
            <a
              id="nav-home-tab"
              class="nav-item nav-link active"
              data-toggle="tab"
              href="#nav-home"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >Whale Miner</a>
            <a
              id="nav-profile-tab"
              class="nav-item nav-link"
              data-toggle="tab"
              href="#nav-profile"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >Lambo Miner</a>
            <a
              id="nav-contact-tab"
              class="nav-item nav-link"
              data-toggle="tab"
              href="#nav-contact"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >My Rank</a>
          </div>
        </nav>
        <div 
          id="nav-tabContent" 
          class="tab-content">
          <div
            id="nav-home"
            class="tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th class="color-primary font-13 font-300">Rank</th>
                    <th class="color-primary font-13 font-300">Username</th>
                    <th class="color-primary font-13 font-300">Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span class="coming-soon-text color-black-min font-13">Coming Soon</span>
                    </td>
                  </tr>
                  <!-- <tr>
                              <td>1</td>
                              <td>Mathias</td>
                              <td>$1.234</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Mathias</td>
                              <td>$1.234</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Mathias</td>
                              <td>$1.234</td>
                  </tr>-->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
