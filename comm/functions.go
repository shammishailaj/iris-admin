package comm

import (
	"time"
	"studyIris/conf"
)

func NowUnix() int {
	return int(time.Now().In(conf.SysTimeLocation).Unix())
}