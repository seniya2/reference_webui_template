package com.polarisoffice.kaia.newtech.prototype.domain;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

public class 평가위원 {

	public @Id @GeneratedValue Long id;

	public String 이름;
		
}
