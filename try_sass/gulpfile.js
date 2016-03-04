var gulp = require("gulp")
var sass = require("gulp-sass")

gulp.task("jade",function(){
    gulp.src(["./sass/**/*.scss","!./sass/**/_*"])
        .pipe(sass())
        .pipe(gulp.dest("./public/"))
})