var app=angular.module("reg",["ui.router"]);app.config(["$httpProvider",function(e){e.interceptors.push("AuthInterceptor")}]).run(["AuthService","Session",function(e,t){var n=t.getToken();n&&e.loginWithToken(n)}]),angular.module("reg").constant("EVENT_INFO",{NAME:"HackSociety"}).constant("DASHBOARD",{UNVERIFIED:"You should have received an email asking you verify your email. Click the link in the email and you can start your application!",INCOMPLETE_TITLE:"You still need to complete your application!",INCOMPLETE:"If you do not complete your application before the [APP_DEADLINE], you will not be considered for the admissions lottery!",SUBMITTED_TITLE:"Your application has been submitted!",SUBMITTED:"Feel free to edit it at any time. However, once registration is closed, you will not be able to edit it any further.\nAdmissions will be determined by a random lottery. Please make sure your information is accurate before registration is closed!",CLOSED_AND_INCOMPLETE_TITLE:"Unfortunately, registration has closed, and the lottery process has begun.",CLOSED_AND_INCOMPLETE:"Because you have not completed your profile in time, you will not be eligible for the lottery process.",ADMITTED_AND_CAN_CONFIRM_TITLE:"You must confirm by [CONFIRM_DEADLINE].",ADMITTED_AND_CANNOT_CONFIRM_TITLE:"Your confirmation deadline of [CONFIRM_DEADLINE] has passed.",ADMITTED_AND_CANNOT_CONFIRM:"Although you were accepted, you did not complete your confirmation in time.\nUnfortunately, this means that you will not be able to attend the event, as we must begin to accept other applicants on the waitlist.\nWe hope to see you again next year!",CONFIRMED_NOT_PAST_TITLE:"You can edit your confirmation information until [CONFIRM_DEADLINE]",DECLINED:"We're sorry to hear that you won't be able to make it to ClashHacks 3.0! :(\nMaybe next year! We hope you see you again soon."}).constant("TEAM",{NO_TEAM_REG_CLOSED:"Unfortunately, it's too late to enter the lottery with a team.\nHowever, you can still form teams on your own before or during the event!"}),angular.module("reg").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,n){t.otherwise("/404"),e.state("login",{url:"/login",templateUrl:"views/login/login.html",controller:"LoginCtrl",data:{requireLogin:!1},resolve:{settings:["SettingsService",function(e){return e.getPublicSettings()}]}}).state("app",{views:{"":{templateUrl:"views/base.html"},"sidebar@app":{templateUrl:"views/sidebar/sidebar.html",controller:"SidebarCtrl",resolve:{settings:["SettingsService",function(e){return e.getPublicSettings()}]}}},data:{requireLogin:!0}}).state("app.dashboard",{url:"/",templateUrl:"views/dashboard/dashboard.html",controller:"DashboardCtrl",resolve:{currentUser:["UserService",function(e){return e.getCurrentUser()}],settings:["SettingsService",function(e){return e.getPublicSettings()}]}}).state("app.organize",{url:"/organize",templateUrl:"views/organize/organize.html",controller:"OrganizeCtrl",resolve:{currentUser:["UserService",function(e){return e.getCurrentUser()}],settings:["SettingsService",function(e){return e.getPublicSettings()}]}}).state("app.application",{url:"/application",templateUrl:"views/application/application.html",controller:"ApplicationCtrl",resolve:{currentUser:["UserService",function(e){return e.getCurrentUser()}],settings:["SettingsService",function(e){return e.getPublicSettings()}]}}).state("app.confirmation",{url:"/confirmation",templateUrl:"views/confirmation/confirmation.html",controller:"ConfirmationCtrl",resolve:{currentUser:["UserService",function(e){return e.getCurrentUser()}]}}).state("app.team",{url:"/team",templateUrl:"views/team/team.html",controller:"TeamCtrl",data:{requireVerified:!0},resolve:{currentUser:["UserService",function(e){return e.getCurrentUser()}],settings:["SettingsService",function(e){return e.getPublicSettings()}]}}).state("app.admin",{views:{"":{templateUrl:"views/admin/admin.html",controller:"AdminCtrl"}},data:{requireAdmin:!0}}).state("app.admin.stats",{url:"/admin",templateUrl:"views/admin/stats/stats.html",controller:"AdminStatsCtrl"}).state("app.admin.users",{url:"/admin/users?&page&size&query",templateUrl:"views/admin/users/users.html",controller:"AdminUsersCtrl"}).state("app.admin.user",{url:"/admin/users/:id",templateUrl:"views/admin/user/user.html",controller:"AdminUserCtrl",resolve:{user:["$stateParams","UserService",function(e,t){return t.get(e.id)}]}}).state("app.admin.settings",{url:"/admin/settings",templateUrl:"views/admin/settings/settings.html",controller:"AdminSettingsCtrl"}).state("reset",{url:"/reset/:token",templateUrl:"views/reset/reset.html",controller:"ResetCtrl",data:{requireLogin:!1}}).state("verify",{url:"/verify/:token",templateUrl:"views/verify/verify.html",controller:"VerifyCtrl",data:{requireLogin:!1}}).state("404",{url:"/404",templateUrl:"views/404.html",data:{requireLogin:!1}}),n.html5Mode({enabled:!0})}]).run(["$rootScope","$state","Session",function(e,t,n){e.$on("$stateChangeSuccess",function(){document.body.scrollTop=document.documentElement.scrollTop=0}),e.$on("$stateChangeStart",function(e,r,o){var i=r.data.requireLogin,s=r.data.requireAdmin,a=r.data.requireVerified;i&&!n.getToken()&&(e.preventDefault(),t.go("login")),s&&!n.getUser().admin&&(e.preventDefault(),t.go("app.dashboard")),a&&!n.getUser().verified&&(e.preventDefault(),t.go("app.dashboard"))})}]),angular.module("reg").factory("AuthInterceptor",["Session",function(e){return{request:function(t){var n=e.getToken();return n&&(t.headers["x-access-token"]=n),t}}}]),angular.module("reg").service("Session",["$rootScope","$window",function(e,t){this.create=function(n,r){t.localStorage.jwt=n,t.localStorage.userId=r._id,t.localStorage.currentUser=JSON.stringify(r),e.currentUser=r},this.destroy=function(n){delete t.localStorage.jwt,delete t.localStorage.userId,delete t.localStorage.currentUser,e.currentUser=null,n&&n()},this.getToken=function(){return t.localStorage.jwt},this.getUserId=function(){return t.localStorage.userId},this.getUser=function(){return JSON.parse(t.localStorage.currentUser)},this.setUser=function(n){t.localStorage.currentUser=JSON.stringify(n),e.currentUser=n}}]),angular.module("reg").factory("Utils",[function(){return{isRegOpen:function(e){return Date.now()>e.timeOpen&&Date.now()<e.timeClose},isAfter:function(e){return Date.now()>e},formatTime:function(e){return e?(date=new Date(e),moment(date).format("dddd, MMMM Do YYYY, h:mm a")+" "+date.toTimeString().split(" ")[2]):"Invalid Date"}}}]),angular.module("reg").factory("AuthService",["$http","$rootScope","$state","$window","Session",function(e,t,n,r,o){function i(e,t){o.create(e.token,e.user),t&&t(e.user)}function s(e,t){n.go("login"),t&&t(e)}var a={};return a.loginWithPassword=function(t,n,r,o){return e.post("/auth/login",{email:t,password:n}).success(function(e){i(e,r)}).error(function(e){s(e,o)})},a.loginWithToken=function(t,n,r){return e.post("/auth/login",{token:t}).success(function(e){i(e,n)}).error(function(e,t){400===t&&o.destroy(s)})},a.logout=function(e){o.destroy(e),n.go("login")},a.register=function(t,n,r,o){return e.post("/auth/register",{email:t,password:n}).success(function(e){i(e,r)}).error(function(e){s(e,o)})},a.verify=function(t,n,r){return e.get("/auth/verify/"+t).success(function(e){o.setUser(e),n&&n(e)}).error(function(e){r&&r(e)})},a.resendVerificationEmail=function(t,n){return e.post("/auth/verify/resend",{id:o.getUserId()})},a.sendResetEmail=function(t){return e.post("/auth/reset",{email:t})},a.resetPassword=function(t,n,r,o){return e.post("/auth/reset/password",{token:t,password:n}).success(r).error(o)},a}]),angular.module("reg").factory("SettingsService",["$http",function(e){var t="/api/settings/";return{getPublicSettings:function(){return e.get(t)},updateRegistrationTimes:function(n,r){return e.put(t+"times",{timeOpen:n,timeClose:r})},updateConfirmationTime:function(n){return e.put(t+"confirm-by",{time:n})},getWhitelistedEmails:function(){return e.get(t+"whitelist")},updateWhitelistedEmails:function(n){return e.put(t+"whitelist",{emails:n})},updateWaitlistText:function(n){return e.put(t+"waitlist",{text:n})},updateAcceptanceText:function(n){return e.put(t+"acceptance",{text:n})},updateConfirmationText:function(n){return e.put(t+"confirmation",{text:n})}}}]),angular.module("reg").factory("UserService",["$http","Session",function(e,t){var n="/api/users",r=n+"/";return{getCurrentUser:function(){return e.get(r+t.getUserId())},get:function(t){return e.get(r+t)},getAll:function(){return e.get(r)},getPage:function(t,r,o){return e.get(n+"?"+$.param({text:o,page:t?t:0,size:r?r:50}))},updateProfile:function(t,n){return e.put(r+t+"/profile",{profile:n})},updateConfirmation:function(t,n){return e.put(r+t+"/confirm",{confirmation:n})},declineAdmission:function(t){return e.post(r+t+"/decline")},joinOrCreateTeam:function(n){return e.put(r+t.getUserId()+"/team",{code:n})},leaveTeam:function(){return e["delete"](r+t.getUserId()+"/team")},getMyTeammates:function(){return e.get(r+t.getUserId()+"/team")},getStats:function(){return e.get(r+"stats")},admitUser:function(t){return e.post(r+t+"/admit")},checkIn:function(t){return e.post(r+t+"/checkin")},checkOut:function(t){return e.post(r+t+"/checkout")}}}]),angular.module("reg").controller("AdminEventsCtrl",["$scope","UserService",function(e,t){t.getStats().success(function(t){e.stats=t,e.loading=!1}),e.fromNow=function(e){return moment(e).fromNow()}}]),angular.module("reg").controller("AdminStatsCtrl",["$scope","UserService",function(e,t){t.getStats().success(function(t){e.stats=t,e.loading=!1}),e.fromNow=function(e){return moment(e).fromNow()}}]),angular.module("reg").controller("AdminSettingsCtrl",["$scope","$sce","SettingsService",function(e,t,n){function r(t){e.loading=!1,t.timeOpen=new Date(t.timeOpen),t.timeClose=new Date(t.timeClose),t.timeConfirm=new Date(t.timeConfirm),e.settings=t}function o(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes())}e.settings={},n.getPublicSettings().success(function(e){r(e)}),n.getWhitelistedEmails().success(function(t){e.whitelist=t.join(", ")}),e.updateWhitelist=function(){n.updateWhitelistedEmails(e.whitelist.replace(/ /g,"").split(",")).success(function(t){swal("Whitelist updated."),e.whitelist=t.whitelistedEmails.join(", ")})},e.formatDate=function(e){return e?moment(e).format("dddd, MMMM Do YYYY, h:mm a")+" "+e.toTimeString().split(" ")[2]:"Invalid Date"},e.updateRegistrationTimes=function(){var t=o(e.settings.timeOpen).getTime(),i=o(e.settings.timeClose).getTime();return t<0||i<0||void 0===t||void 0===i?swal("Oops...","You need to enter valid times.","error"):t>=i?void swal("Oops...","Registration cannot open after it closes.","error"):void n.updateRegistrationTimes(t,i).success(function(e){r(e),swal("Looks good!","Registration Times Updated","success")})},e.updateConfirmationTime=function(){var t=o(e.settings.timeConfirm).getTime();n.updateConfirmationTime(t).success(function(e){r(e),swal("Sounds good!","Confirmation Date Updated","success")})};var i=new showdown.Converter;e.markdownPreview=function(e){return t.trustAsHtml(i.makeHtml(e))},e.updateWaitlistText=function(){var t=e.settings.waitlistText;n.updateWaitlistText(t).success(function(e){swal("Looks good!","Waitlist Text Updated","success"),r(e)})},e.updateAcceptanceText=function(){var t=e.settings.acceptanceText;n.updateAcceptanceText(t).success(function(e){swal("Looks good!","Acceptance Text Updated","success"),r(e)})},e.updateConfirmationText=function(){var t=e.settings.confirmationText;n.updateConfirmationText(t).success(function(e){swal("Looks good!","Confirmation Text Updated","success"),r(e)})}}]),angular.module("reg").controller("AdminStatsCtrl",["$scope","UserService",function(e,t){t.getStats().success(function(t){e.stats=t,e.loading=!1}),e.fromNow=function(e){return moment(e).fromNow()}}]),angular.module("reg").controller("AdminStatsCtrl",["$scope","UserService",function(e,t){t.getStats().success(function(t){e.stats=t,e.loading=!1}),e.fromNow=function(e){return moment(e).fromNow()}}]),angular.module("reg").controller("AdminUserCtrl",["$scope","$http","user","UserService",function(e,t,n,r){function o(){t.get("/assets/schools.json").then(function(t){var n=t.data,r=e.selectedUser.email.split("@")[1];n[r]&&(e.selectedUser.profile.school=n[r].school,e.autoFilledSchool=!0)})}e.selectedUser=n.data,o(),e.updateProfile=function(){r.updateProfile(e.selectedUser._id,e.selectedUser.profile).success(function(e){$selectedUser=e,swal("Updated!","Profile updated.","success")}).error(function(){swal("Oops, you forgot something.")})}}]),angular.module("reg").controller("AdminUsersCtrl",["$scope","$state","$stateParams","UserService",function(e,t,n,r){function o(t){e.users=t.users,e.currentPage=t.page,e.pageSize=t.size;for(var n=[],r=0;r<t.totalPages;r++)n.push(r);e.pages=n}function i(e){if(e)return moment(e).format("MMMM Do YYYY, h:mm:ss a")}function s(t){e.selectedUser=t,e.selectedUser.sections=a(t),$(".long.user.modal").modal("show")}function a(e){return[{name:"Basic Info",fields:[{name:"Created On",value:i(e.timestamp)},{name:"Last Updated",value:i(e.lastUpdated)},{name:"Confirm By",value:i(e.status.confirmBy)||"N/A"},{name:"Checked In",value:i(e.status.checkInTime)||"N/A"},{name:"Email",value:e.email},{name:"Team",value:e.teamCode||"None"}]},{name:"Profile",fields:[{name:"Name",value:e.profile.name},{name:"Gender",value:e.profile.gender},{name:"School",value:e.profile.school},{name:"Graduation Year",value:e.profile.graduationYear},{name:"Description",value:e.profile.description},{name:"Essay",value:e.profile.essay}]},{name:"Confirmation",fields:[{name:"Phone Number",value:e.confirmation.phoneNumber},{name:"Dietary Restrictions",value:e.confirmation.dietaryRestrictions.join(", ")},{name:"Shirt Size",value:e.confirmation.shirtSize},{name:"Major",value:e.confirmation.major},{name:"Github",value:e.confirmation.github},{name:"Website",value:e.confirmation.website},{name:"Needs Hardware",value:e.confirmation.needsHardware,type:"boolean"},{name:"Hardware Requested",value:e.confirmation.hardware}]},{name:"Hosting",fields:[{name:"Needs Hosting Friday",value:e.confirmation.hostNeededFri,type:"boolean"},{name:"Needs Hosting Saturday",value:e.confirmation.hostNeededSat,type:"boolean"},{name:"Gender Neutral",value:e.confirmation.genderNeutral,type:"boolean"},{name:"Cat Friendly",value:e.confirmation.catFriendly,type:"boolean"},{name:"Smoking Friendly",value:e.confirmation.smokingFriendly,type:"boolean"},{name:"Hosting Notes",value:e.confirmation.hostNotes}]},{name:"Travel",fields:[{name:"Needs Reimbursement",value:e.confirmation.needsReimbursement,type:"boolean"},{name:"Received Reimbursement",value:e.confirmation.needsReimbursement&&e.status.reimbursementGiven},{name:"Address",value:e.confirmation.address?[e.confirmation.address.line1,e.confirmation.address.line2,e.confirmation.address.city,",",e.confirmation.address.state,e.confirmation.address.zip,",",e.confirmation.address.country].join(" "):""},{name:"Additional Notes",value:e.confirmation.notes}]}]}e.pages=[],e.users=[],$(".ui.dimmer").remove(),e.selectedUser={},e.selectedUser.sections=a({status:"",confirmation:{dietaryRestrictions:[]},profile:""}),r.getPage(n.page,n.size,n.query).success(function(e){o(e)}),e.$watch("queryText",function(e){r.getPage(n.page,n.size,e).success(function(e){o(e)})}),e.goToPage=function(e){t.go("app.admin.users",{page:e,size:n.size||50})},e.goUser=function(e,n){e.stopPropagation(),t.go("app.admin.user",{id:n._id})},e.toggleCheckIn=function(t,n,o){t.stopPropagation(),n.status.checkedIn?r.checkOut(n._id).success(function(t){e.users[o]=t,swal("Accepted",t.profile.name+" has been checked out.","success")}):swal({title:"Whoa, wait a minute!",text:"You are about to check in "+n.profile.name+"!",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Yes, check them in.",closeOnConfirm:!1},function(){r.checkIn(n._id).success(function(t){e.users[o]=t,swal("Accepted",t.profile.name+" has been checked in.","success")})})},e.acceptUser=function(t,n,o){t.stopPropagation(),swal({title:"Whoa, wait a minute!",text:"You are about to accept "+n.profile.name+"!",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Yes, accept them.",closeOnConfirm:!1},function(){swal({title:"Are you sure?",text:"Your account will be logged as having accepted this user. Remember, this power is a privilege.",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Yes, accept this user.",closeOnConfirm:!1},function(){r.admitUser(n._id).success(function(t){e.users[o]=t,swal("Accepted",t.profile.name+" has been admitted.","success")})})})},e.rowClass=function(e){return e.admin?"admin":e.status.confirmed?"positive":e.status.admitted&&!e.status.confirmed?"warning":void 0},e.selectUser=s}]),angular.module("reg").controller("AdminCtrl",["$scope","UserService",function(e,t){e.loading=!0}]),angular.module("reg").controller("ApplicationCtrl",["$scope","$rootScope","$state","$http","currentUser","settings","Session","UserService",function(e,t,n,r,o,i,s,a){function u(){r.get("/assets/schools.json").then(function(t){var n=t.data,r=e.user.email.split("@")[1];n[r]&&(e.user.profile.school=n[r].school,e.autoFilledSchool=!0)})}function c(t){a.updateProfile(s.getUserId(),e.user.profile).success(function(e){sweetAlert({title:"Awesome!",text:"Your application has been saved.",type:"success",confirmButtonColor:"#e76482"},function(){n.go("app.dashboard")})}).error(function(e){sweetAlert("Uh oh!","Something went wrong.","error")})}function l(){$(".ui.form").form({fields:{name:{identifier:"name",rules:[{type:"empty",prompt:"Please enter your name."}]},school:{identifier:"school",rules:[{type:"empty",prompt:"Please enter your school name."}]},year:{identifier:"year",rules:[{type:"empty",prompt:"Please select your graduation year."}]},gender:{identifier:"gender",rules:[{type:"empty",prompt:"Please select a gender."}]},adult:{identifier:"adult",rules:[{type:"checked",prompt:"You must be an adult, or an MIT student."}]}}})}e.user=o.data,e.isMitStudent="mit.edu"==e.user.email.split("@")[1],e.isMitStudent&&(e.user.profile.adult=!0),u(),l(),e.regIsClosed=Date.now()>i.data.timeClose,e.submitForm=function(){$(".ui.form").form("is valid")&&c()}}]),angular.module("reg").controller("ConfirmationCtrl",["$scope","$rootScope","$state","currentUser","Utils","UserService",function(e,t,n,r,o,i){function s(t){var r=e.user.confirmation,o=[];Object.keys(e.dietaryRestrictions).forEach(function(t){e.dietaryRestrictions[t]&&o.push(t)}),r.dietaryRestrictions=o,i.updateConfirmation(u._id,r).success(function(e){sweetAlert({title:"Woo!",text:"You're confirmed!",type:"success",confirmButtonColor:"#e76482"},function(){n.go("app.dashboard")})}).error(function(e){sweetAlert("Uh oh!","Something went wrong.","error")})}function a(){$(".ui.form").form({fields:{shirt:{identifier:"shirt",rules:[{type:"empty",prompt:"Please give us a shirt size!"}]},phone:{identifier:"phone",rules:[{type:"empty",prompt:"Please enter a phone number."}]},signatureLiability:{identifier:"signatureLiabilityWaiver",rules:[{type:"empty",prompt:"Please type your digital signature."}]},signaturePhotoRelease:{identifier:"signaturePhotoRelease",rules:[{type:"empty",prompt:"Please type your digital signature."}]},signatureCodeOfConduct:{identifier:"signatureCodeOfConduct",rules:[{type:"empty",prompt:"Please type your digital signature."}]}}})}var u=r.data;e.user=u,e.pastConfirmation=Date.now()>u.status.confirmBy,e.formatTime=o.formatTime,a(),e.fileName=u._id+"_"+u.profile.name.split(" ").join("_");var c={Vegetarian:!1,Vegan:!1,Halal:!1,Kosher:!1,"Nut Allergy":!1};u.confirmation.dietaryRestrictions&&u.confirmation.dietaryRestrictions.forEach(function(e){e in c&&(c[e]=!0)}),e.dietaryRestrictions=c,e.submitForm=function(){$(".ui.form").form("is valid")&&s()}}]),angular.module("reg").controller("DashboardCtrl",["$rootScope","$scope","$sce","currentUser","settings","Utils","AuthService","UserService","EVENT_INFO","DASHBOARD",function(e,t,n,r,o,i,s,a,u){var c=o.data,l=r.data;t.user=l,t.DASHBOARD=u;for(var m in t.DASHBOARD)t.DASHBOARD[m].includes("[APP_DEADLINE]")&&(t.DASHBOARD[m]=t.DASHBOARD[m].replace("[APP_DEADLINE]",i.formatTime(c.timeClose))),t.DASHBOARD[m].includes("[CONFIRM_DEADLINE]")&&(t.DASHBOARD[m]=t.DASHBOARD[m].replace("[CONFIRM_DEADLINE]",i.formatTime(l.status.confirmBy)));var d=t.regIsOpen=i.isRegOpen(c),f=t.pastConfirmation=i.isAfter(l.status.confirmBy);t.dashState=function(e){var n=t.user;switch(e){case"unverified":return!n.verified;case"openAndIncomplete":return d&&n.verified&&!n.status.completedProfile;case"openAndSubmitted":return d&&n.status.completedProfile&&!n.status.admitted;case"closedAndIncomplete":return!d&&!n.status.completedProfile&&!n.status.admitted;case"closedAndSubmitted":return!d&&n.status.completedProfile&&!n.status.admitted;case"admittedAndCanConfirm":return!f&&n.status.admitted&&!n.status.confirmed&&!n.status.declined;case"admittedAndCannotConfirm":return f&&n.status.admitted&&!n.status.confirmed&&!n.status.declined;case"confirmed":return n.status.admitted&&n.status.confirmed&&!n.status.declined;case"declined":return n.status.declined}return!1},t.showWaitlist=!d&&l.status.completedProfile&&!l.status.admitted,t.resendEmail=function(){s.resendVerificationEmail().then(function(){sweetAlert("Your email has been sent.")})};var p=new showdown.Converter;t.acceptanceText=n.trustAsHtml(p.makeHtml(c.acceptanceText)),t.confirmationText=n.trustAsHtml(p.makeHtml(c.confirmationText)),t.waitlistText=n.trustAsHtml(p.makeHtml(c.waitlistText)),t.declineAdmission=function(){swal({title:"Whoa!",text:"Are you sure you would like to decline your admission? \n\n You can't go back!",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Yes, I can't make it.",closeOnConfirm:!0},function(){a.declineAdmission(l._id).success(function(n){e.currentUser=n,t.user=n})})}}]),angular.module("reg").controller("LoginCtrl",["$scope","$http","$state","settings","Utils","AuthService",function(e,t,n,r,o,i){function s(){n.go("app.dashboard")}function a(t){e.error=t.message}function u(){e.error=null}var c=r.data;e.regIsOpen=o.isRegOpen(c),e.loginState="login",e.login=function(){u(),i.loginWithPassword(e.email,e.password,s,a)},e.register=function(){u(),i.register(e.email,e.password,s,a)},e.setLoginState=function(t){e.loginState=t},e.sendResetEmail=function(){var t=e.email;i.sendResetEmail(t),sweetAlert({title:"Don't Sweat!",text:"An email should be sent to you shortly.",type:"success",confirmButtonColor:"#e76482"})}}]),angular.module("reg").controller("OrganizeCtrl",["$rootScope","$scope","$sce","currentUser","settings","Utils","AuthService","UserService","EVENT_INFO","DASHBOARD",function(e,t,n,r,o,i,s,a,u){}]),angular.module("reg").controller("ResetCtrl",["$scope","$stateParams","$state","AuthService",function(e,t,n,r){var o=t.token;e.loading=!0,e.changePassword=function(){var t=e.password,i=e.confirm;return t!==i?(e.error="Passwords don't match!",void(e.confirm="")):void r.resetPassword(o,e.password,function(e){sweetAlert({title:"Neato!",text:"Your password has been changed!",type:"success",confirmButtonColor:"#e76482"},function(){n.go("login")})},function(t){e.error=t.message,e.loading=!1})}}]),angular.module("reg").controller("SidebarCtrl",["$rootScope","$scope","settings","Utils","AuthService","Session","EVENT_INFO",function(e,t,n,r,o,i,s){var a=(n.data,e.currentUser);t.EVENT_INFO=s,t.pastConfirmation=r.isAfter(a.status.confirmBy),t.logout=function(){o.logout()},t.showSidebar=!1,t.toggleSidebar=function(){t.showSidebar=!t.showSidebar},$(".item").on("click",function(){t.showSidebar=!1})}]),angular.module("reg").controller("TeamCtrl",["$scope","currentUser","settings","Utils","UserService","TEAM",function(e,t,n,r,o,i){function s(){o.getMyTeammates().success(function(t){e.error=null,e.teammates=t})}var a=n.data;e.regIsOpen=r.isRegOpen(a),e.user=t.data,e.TEAM=i,e.user.teamCode&&s(),e.joinTeam=function(){o.joinOrCreateTeam(e.code).success(function(t){e.error=null,e.user=t,s()}).error(function(t){e.error=t.message})},e.leaveTeam=function(){o.leaveTeam().success(function(t){e.error=null,e.user=t,e.teammates=[]}).error(function(t){e.error=t.data.message})}}]),angular.module("reg").controller("VerifyCtrl",["$scope","$stateParams","AuthService",function(e,t,n){var r=t.token;e.loading=!0,r&&n.verify(r,function(t){e.success=!0,e.loading=!1},function(t){e.loading=!1})}]);