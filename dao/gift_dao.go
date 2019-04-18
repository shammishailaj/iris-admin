package dao

import (
	"github.com/go-xorm/xorm"
	"lottery/models"
)

type GiftDao struct {
	engine *xorm.Engine
}

func NewGiftDao(engine *xorm.Engine) *GiftDao{
	return &GiftDao{
		engine:engine,
	}
}
//通过ID获取用户
func (d *GiftDao) Get(id int) *models.LtGift{
	data := &models.LtGift{Id:id}
	ok,err := d.engine.Get(data)
	if ok && err ==nil{
		return data
	}else{
		//可以返回nil
		data.Id =0
		return data
	}
	return nil
}

//获取奖品集合

func (d *GiftDao) GetALL() []models.LtGift {
	datalist :=make([]models.LtGift,0)
	err :=d.engine.Asc("sys_status").Asc("displayorder").Find(&datalist)
	if err!=nil{
		return datalist
	}else {
		return datalist
	}
	return datalist
}

//获取总数
func (d *GiftDao) CountAll() int64 {
	num,err := d.engine.Count(&models.LtGift{})
	if err !=nil{
		return 0
	}else {
		return num
	}
}
// 搜索

func (d *GiftDao) Search(country string) []models.LtGift {
	dataList := make([]models.LtGift,0)
	err :=d.engine.Where("country?",country).Desc("id").Find(&dataList)
	if err !=nil{
		return dataList
	}else {
		return dataList
	}
}


//删除

func (d *GiftDao) Delete(id int) error{
	data := &models.LtGift{Id:id,SysStatus:1}
	_,err :=d.engine.Id(data.Id).Update(data)
	return err 
}

//更新
func (d *GiftDao) Update(data *models.LtGift,columns []string) error  {
	_,err :=d.engine.Id(data.Id).MustCols(columns...).Update(data)
	return err
}
//创建
func (d *GiftDao) Create(data *models.LtGift) error {
	_,err :=d.engine.Insert(data)
	return err
}

func (d *GiftDao) GetAllUse() []models.LtGift {
	now :=
}
