### 1. 하이퍼레저 패브릭 개요

- Permissioned and Private Blockchain (허가형 프라이빗 블록체인)
- MSP (Membership Service Provider) 

  - 인증관리 시스템에 등록한 사용자만 참여 가능
- Channel
  - 같은 채널의 데이터 사용 가능 
  - 다른 채널로 분산원장 전송 불가
- Shared Ledger 
  - World state - 원장의 현재 상태 (예: 통장의 현재 잔고)
  - Blockchain - 원장의 전체 기록 (예: 통장의 전체 거래 내역)
- Chaincode (= 스마트 컨트랙트)
  - 원장에 데이터 읽기/쓰기 가능
  - System chaincode(시스템 체인코드)를 이용해 블록체인 시스템 설정 가능

- 특징
  - 프라이버시와 기밀성
  - 작업 구간별 병렬 처리
  - 체이코드
  - 모듈화된 디자인

- 3단계 데이터 처리 과정

  - Execute - Transaction을 실행 -> 결과값을 검증
  - Order - 실행 단계에서 검증이 끝난 Transaction을 취합 -> 순서에 맞게 정렬 -> 블록 생성
  - Validation -  블록에 있는 Transaction의 결과값 검증 -> 디지털 인증서 확인 -> 최신 블록을 업데이트



### 2. 하이퍼레저 패브릭 구성요소

#### 	2.1. Peer

- 네트워크 노드
- 분산원장, 체인코드를 관리
- peer를 통해서만 분산원장, 체인코드 접근 가능
- 복수 개의 분산원장과 체인코드 보유 가능 
- Endorsing peer, Committing peer로 구분
- Endorsing peer
  - DApp이 peer에게 트랜잭션을 제출 할 시 해당 트랜잭션에 대한 보증 여부를 판단하고 자신의 Identity로 사인
- Committing peer
  - 새로운 블록을 기존 블록체인에 추가할 것인지에 대한 보증 여부를 판단
- 모든 peer는 Commiting peer 역할을 하며, Committing peer의 Endorsing 기능을 활성화시키면 Endorsing peer의 역할도 함께 수행	

#### 2.2. Chaincode (수정)

- 분산원장에 데이터를 기록하거나 읽기 위해 필요
- 사용자A가 사용자B에게 1000원을 송금하는 트랜잭션을 분산 어플리케이션을 이용하여 생성한 후 체인코드로 전달하면 체인코드는 분산원장에 있는 사용자A의 계좌 잔액 기록을 1000원을 뺀 금액으로 수정하고 사용자B의 계좌 잔액 기록에서는 1000원을 더한 금액으로 수정

##### 2.2.1. System chaincode (시스템 체인코드)

- 하이퍼레저 패브릭이 기본으로 제공하는 체인코드이며 5가지 시스템 체인코드가 있음
- QSCC, CSCC, LSCC는 CLI 명령어로 실행함
- ESCC, VSCC는 Endorsing peer(트랜잭션 보증을 담당하는 peer)와 Commiting peer(블록 검증을 담당하는 peer)가 실행
- QSCC (Qeury System Chaincode)
  - 블록체인에 있는 데이터를 읽을 때 사용
  - 채널 구성원은 CLI 명령어를 이용해 블록 번호, 블록 해시값, 트랜잭션 ID 등을 읽을 수 있음
- ESCC (Endorsement System Chaincode)
  - 보증 정책을 담당
  - Endorsing peer는 ESCC를 통해 사용자의 트랜잭션 실행 결과값을 비교하고 결과값이 참이면 자신의 인증서를 통해 해당 트랜잭션 결과값에 대한 보증을 한다.
  - 비즈니스 로직에 맞게 수정 가능
- VSCC (Validation System Chaincode)
  - 블록 검증에 사용
  - Commiting peer는 VSCC를 실행하여 트랜잭션의 Read/Write Set과 보증 정책에 맞게 Endorsing peer의 디지털 인증서의 존재 여부를 확인
  - 비즈니스 로직에 맞게 수정 가능
- CSCC (Configuration System Chaincode)
  - 채널 설정 시 사용
  - 블록에 대한 정보를 읽거나 수정 가능, peer를 채널에 참여 가능
  - CSCC를 실행 후 반드시 사용자에게 결과값을 반환할 필요 없음
- LSCC (Lifecycle System Chaincode)
  - 체인코드의 설치부터 인스턴스화까지 모든 일련의과정을 수행하는데 사용
  - LSCC를 실행 후 반드시 사용자에게 결과값을 반환할 필요 없음

#### 2.3. DApp

- 체인코드의 기능 - 읽기(query) 5단계, 쓰기(write/update) 9 단계

- 분산원장의 데이터를 읽어오는 단계
  1.  사용자가 트랜잭션 생성 요청
  2.  사용자 인증서를 이용해 peer와 연결
  3.  체인코드 실행 요청
  4.  체인코드의 query 함수 실행 
     - 로컬저장소에 있는 데이터 읽기
  5.  peer -> DApp으로 결과값 반환 -> 사용자A에게 결과값 반환
-  분산원장 업데이트 과정
  1.  사용자가 트랜잭션 생성 요청
  2.  사용자 인증서를 이용해 peer와 연결
  3.  체인코드 실행 요청
  4.  체인코드 update 함수 실행

     - 로컬저장소에 있는 데이터 update
  5.  peer가 트랜잭션 입력에 대한 결과값과 보증 정책을 확인

     - 트랙잭션 결과값이 정상, peer의 보증조건이 충족 -> peer는 결과값과 peer의 디지털 인증서를 DApp에 전달
  6. DApp은 트랜잭션 결과값, peer의 디지털 인증서를 orderer 노드로 전송
  7. orderer는 DApp에서 받은 트랜잭션을 순서에 맞게 정렬하고 블록체인의 최신 블록을 생성
  8. orderer는 생성한 블록을 자신이 속한 네트워크의 모든 peer에게 전달 
     - orderer는 트랜잭션을 순서에 맞게 정렬하고 블록을 생성할 뿐 트랜잭션 내용을 확인하고 검증하지 않음
  9. peer는 블록에 포함된 모든 트랜잭션에 대한 결과값과 인증서를 검증. 문제가 없을 시 자신의 로컬 저장소에 있는 분산원장을 업데이트, 블록 업데이트 결과를 DApp에 알림

#### 2.4. Endorsement Policy (수정 필요)

- 보증 정책은 트랜잭션을 생성하는 클라이언트(DApp), peer 사이에  
- 트랜잭션이 보증 정책을 충족하지 못하면 peer가 블록을 검증하는 과정에서 해당 트랜잭션을 블록에 포함하지 않는다. 보증받지 못했다는 태그(invalid tag)와 함께 트랜잭션을 블록에 기록함. 해당 트랜잭션은 앞으로의 거래에 전혀 영향이 없음
- 7대의 peer가 구성되어 있음
  - 보증 그룹 = {peer1, peer2, peer3, peer4, peer5, peer6, peer7} 예1
  - Endorsement Policy
  - 보증 그룹의 모든 peer의 디지털 인증서를 획득해야 함
  - 보증 그룹의 peer 중 1대의 peer의 디지털 인증서를 획득해야 함
  - {peer1 OR peer2} AND {any two of peer5, peer6, peer7} 예2
  - 보증 그룹 = {peer1 = 15, peer2 = 10, peer3 = 25, peer4 = 20, peer5 = 10, peer6 = 10, peer7 = 10}
  - 가중치 합계 50이상의 peer들로부터 디지털 인증서를 획득해야 함
  - {peer1 OR peer3} AND {가중치 40 이상} 

#### 2.5. Organization

![](C:\Users\kevin\OneDrive\바탕 화면\조직간 연결 개념도.jpg)

- 채널 당 분산원장은 1개 
- 채널이 같은 peer끼리 데이터 공유 가능 
- 서로 다른 채널의 peer는 분산원장에 대한 정보 공유 불가
  - 예) peer5는 채널 2의 분산원장 정보를 채널1의 peer에 공유 불가
- 각 조직마다 동일하거나 다른 DApp을 가질 수 있음
  - 예) 채널1(금융 업무를 위한 채널) 금융 관련 DApp을 개발하여 업무 가능

#### 2.6. Channel (그림 점검)

- peer 간 통신은 채널을 통해야만 가능
- 채널에 참여한 조직의 구성원만 해당 채널의 분산원장에 접근 가능
- CSCC를 호출하여 채널 생성하면 분산원장의 genesis block이 생성됨
- genesis block에는 채널의 구성원, 채널 정책, 각 peer의 역할 등 포함되어 있음

#### 2.7. Ledger

- 하이퍼레저 패브릭은 채널 구성원들의 모든 정보를 통합한 하나의 공동 원장을 관리하는 구조
- 이미 합의를 완료한 블록의 데이터의 경우 잘못된 데이터를 발견해도 수정 불가

![](C:\Users\kevin\OneDrive\바탕 화면\그림1.jpg)



![](C:\Users\kevin\OneDrive\바탕 화면\그림2.jpg)



- World state 

  - 원장의 현재 상태이며 블록체인과 분리되어 구축되어 있다
  - 현재 값을 관리하는 데이터베이스
  - World state에 저장된 데이터는 합의과정에 의해 블록체인에 포함되기전까지 체인코드를 통해 조회/변경/삭제 가능
  - 합의에 의해 결정된 블록, 블록체인은 절대 수정 불가(Non-deterministic, Fork 문제 해결)
  - World state는 데이터의 기록, 수정, 읽기 등이 빈번하게 발생하므로 분산 DB로 구축 (Level DB, CouchDB 지원)
    - Level DB - key-value 저장 방식
    - Couch DB - JSON 저장 방식
  - 블록체인(Transaction log)은 데이터 요청이 거의 없고, append-only 목적으로 저장하기 때문에 파일시스템 형태로 저장
  - Version은 World state가 업데이트될때 마다 증가
  - 트랜잭션의 Version == World state의 Version 이어야만 업데이트 가능

- Block chain (원장의 생성 시점부터 현재까지의 사용 기록)

  - 정해진 용량 또는 일정 시간 동안 발생한 트랜잭션은 하나의 블록이 됨
  - 블록 헤더 - 현재 트랜잭션의 해시값, 이전 단계에서 생성된 블록의 해시값을 포함
  - 블록마다 Header, Data, Metadata 필드가 존재


![블록 헤더 구조도](C:\Users\kevin\OneDrive\바탕 화면\블록 헤더 구조도.jpg)

- Block Number: 0부터 시작하여 합의 과정에 의해 블록이 생성될 때마다 숫자가 1씩 증가
- Current block hash: 현재 블록에 포함되어 있는 트랜잭션의 해시값
- Previous block hash: 이전 블록에 대한 해시값



![트랜잭션의 구조도](C:\Users\kevin\OneDrive\바탕 화면\트랜잭션 구조도.jpg)



- Header: 트랜잭션의 version 정보와 트랜잭션이 실행되는 체인코드의 이름이 명시
- Signature: 트랜잭션 생성자의 Identity 관련 디지털 인증서 정보
- Proposal: 체인코드에 들어가는 트랜잭션이 입력값이 저장, 해당 입력값을 이용해 체인코드 실행
- Response: 트랜잭션 처리 결과값을 Read/Write set 형태로 변환
  - Read: 트랜잭션의 proposal이 반영되기 전 값
  - Write: proposal 값이 반영된 후의 값
  - 최신 블록 검증 과정에 사용
- Endorsement: 트랜잭션을 보증해 준 peer의 Identity 정보가 포함. 보증 정책에 따라 Endorsement는 1개 또는 여러 개가 될 수 있음
- Chaincode name: 트랜잭션이 실행되는 체인코드를 구분하는데 사용. peer가 트랜잭션을 입력받으면 Chaincode name이 가리키는 체인코드를 실행
- Metadata: 블록 생성자의 Idendity 정보, 블록에 포함되어 있는 트랜잭션 보증 여부 포함.

#### 2.8. Gossip

- peer는 끊임없이 브로드캐스트 메시지를 생성하여 같은 채널에 있는 peer의 상태를 확인. 브로드캐스트 메시지에 응답하지 못한 peer는 오프라인 상태로 인식
- Gossip 프로토콜을 이용해 채널 내 peer들을 랜덤하게 선택하여 분산원장을 전송.  수신받은 peer는 자신의 분산원장과 비교해 업데이트된 최신 정보가 있으면 peer 자신의 분산원장에 해당 내용을 업데이트함
- 조직의 모든 peer가 orderer에게 분산원장을 요청하면 과부화가 생길 수 있음. 그래서 각 조직에서는 Leader peer를 설정해 orderer와 통신함.
- Leader peer는 자동 또는 수동으로 선택 가능

  - 수동일 경우 1대 이상의 Leader peer 설정 가능
  - 자동일 경우 조직 당 1개 Leader peer만 설정 가능
- 같은 조직의 peer에게 heartbeat 메시지를 주기적으로 보내어 자신이 살아있음을 증명함
  - 만약 1개 이상의 peer가 특정 시간 동안 heartbeat 메시지를 수신하지 못한다면 새로운 Leader peer를 선출
  - 같은 채널에 있는 peer들 중 특정 peer로부터 일정 시간 동안 heartbeat 메시지가 수신되지 않으면 해당 peer는 죽은 것으로 간주해 채널 맴버십에서 제외

#### 2.9. Identity

- peer, orderer, client 등 네트워크 노드들은 서로의 신원을 PKI(Public Key Infrastructure)기반의 디지털 인증서로 함
- PKI 기반 peer,orderer, client 디지털 인증서를 cryptogen과 Fabric-CA로 생성
- PKI는 CA(Certificate Authority)가 관리
- CA는 디지털 인증서를 안전하게 관리, 디지털 인증서를 필요한 사용자에게 발급/저장/삭제
- PKI의 4가지 구성요소
  - 디지털 인증서: X.509 인증서 사용
    - Certificate Serial Number: 인증서를 구분하는 고유의 시리얼 번호를 포함 (최대 20octet 사용)
    - Signagure Algorithm Identifier for CA: 인증서의 위/변조를 방지하기 위해 사용
    - Issuer Name: 인증서를 발급한 CA의 정보
    - Validity Period: 인증서의 유효기간의 시작일과 만료일이 표시
    - Subject Name: 인증서 사용자의 정보
    - Subject Public Key Information: 인증서 사용자의 공개키
    - Extension: 인증서의 추가적인 정보와 정책
    - CA Signature: CA의 디지털 인증서 정보
  - 공개키/비밀키
    - 무결성을 증명하기 위해 신원 인증과 데이터 암호화는 기본
    - 사용자A의 비밀키를 이용해 데이터 암호화, 사용자B는 사용자A의 공개키를 획득, 사용자A는 사용자B에게 암호화된 파일 전송, 사용자A의 공개키를 이용해 데이터 복호화
    - 사용자B가 사용자A에게 데이터를 암호화해서 전송, 사용자B는 사용자A의 공개키를 획득, 사용자A의 공개키를 이용해 데이터를 암호화, 사용자B가 사용자A에게 암호화된 데이터를 전송, 사용자A는 자신의 비밀키를 이용해 데이터 복호화
  - CA
    - MITM (중간자 공격, Man in the Middle Attack)을 방지하기 위해 사용
    - CA에게 공개키를 요청, 따라서 CA는 신뢰할 수 있는 기관에 의해 운영됨
    - 우리나라는 한국정보보호진흥원에서 CA를 운영
    - 하이퍼레저 패브릭에서는 Fabric-CA 노드가 CA역할
  - Certificate Revocation List
    - 폐기된 인증서 목록
    - CA는 CRL을 통해 폐기된 인증서 관리
    - 사용자B는 사용자A로부터 인증서를 받으면 CRL에 해당 인증서가 존재하는지 확인 후 올바른 사용자로 판단하고 인증절차를 수행

#### 2.10. MSP

- Identity 기술을 바탕으로 만든 하이퍼레저 패브릭 멤버십 관리 기술
- peer, orderer, Fabric-CA, Admin의 역할, 소속, 권한 등을 정의
- local MSP, channel MSP가 있음
- local MSP
  - 하이퍼레저 패브릭 네트워크 노드의 역할을 부여할 때 사용
  - 어떤 노드가 peer, orerer, client인지 정의하고 client가 Admin인지 일반 유저인지 권한 정의
  - 하이퍼레저 패브릭의 모든 네트워크 노드는 하나 이상의 local MSP가 정의되어야 함
- channel MSP
  - 채널 구성원들에 대한 멤버십 정의와 권한을 부여할 때 사용
  - 채널에 참여한 구성원들은 local MSP를 이용해 하나의 channel MSP를 생성
  - 어떤 조직에서 채널에 참여하려 할 대 채널 구성원은 channel MSP를 참고하여 보증 또는 거절
  - 채널 구성원은 channel MSP에 따라 역할과 권한을 부여 받음
- MSP는 9가지 종류의 인증서로 구성됨
  - Root CA: 하이퍼레저 패브릭의 RCA(Root CA) 디지털 인증서를 나타냄
  - Intermediate CA: 하이퍼레저 패브릭의 ICA 디지털 인증서를 나타냄. 하나의 조직을 세분화해 각 조직마다 ICA를 설치하고 MSP 관리 가능
  - Organizational Units (OU): ICA를 사용하지 않고 하나의 RCA를 이용해서 조직을 세분화하고 싶을 때 사용. $FABRIC_CFG_PATH/msp/config.yaml 파일에 OU관련 정보가 입력되어 있고 'openssl x509 -in' 명령어를 통해 내용 확인 가능
  - Administrators: 조직 운영자의 인증서를 나타냄. MSP 구조에서 조직당 하나 이상의 운영자 인증서가 존재해야함.
  - Revoke Certificate: 폐기된 인증서를 나타냄. CRL 검사 시 해당 폴더를 참고
  - Node Identity: 개인키로 암호화한 인증서를 나타냄 
  - Keystore: 개인키를 나타냄
  - TLS Root CA: 보안 강화를 위해 TLS 기능을 사용할 때 Root CA로부터 발급 받은 TLS 인증서를 나타냄. TLS 통신은 주로 peer와 orderer 사이에 사용
  - TLS Intermediate CA: Intermediate CA로부터 발급받은 TLS 인증서를 나타냄

#### 2.11. Orderer

- 최신 블록을 생성 후 peer에게 전달
- 1단계: 트랜잭션 제출
  - DApp이 Endorsing peer에게 트랜잭션을 제출
  - 트랜잭션을 받은 Endorsing peer는 Proposal 값으로 체인코드를 시뮬레이션 함
  - 올바른 결과값이라면 Endorsing peer는 자신의 Identity를 이용해  디지털 인증서와 Read/Write set을 함께 DApp에게 전송
- 2단계: 블록 패키징
  - 트랜잭션 제출 과정에서 트랜잭션을 orderer가 수집하여 순서대로 정렬한 후 최신 블록을 생성하는 과정
  - DApp은 Endorsing peer에게 받은 Read/Write set과 Endorsing peer의 디지털 인증서를 트랜잭션과 함께 orderer에 전송
  - 트랜잭션을 받은 orderer는 해당 트랜잭션을 순서대로 정렬한 후 최신 블록을 생성
  - 1단계에서 Endorsing peer가 트랜잭션을 보증한 후 DApp에 전달하면 DApp은 orderer에게 해당 트랜잭션을 전송하고 orderer 노드는 수신받은 트랜잭션을 수집해 블록을 생성한다. 동시에 Endorsing peer는 orderer 노드의 블록 생성 여부와는 관계없이 DApp으로부터 수신받은 새로운 트랜잭션에 대한 보증 작업을 수행. 3단계는 1단계,2단계 과정의 영향을 받지 않고 Committing peer가 독립적으로 수신받는 최신 블록에 대한 검증 작업을 수행. 이처럼 orderer 노드는 1단계와 3단계의 peer노드 작업과는 관계없이 독립적으로 트랜잭션을 수집하여 취합한 후 블록을 생성하는 작업을 수행
- 3단계: 검증
  - orderer가 생성한 최신 블록을 각 조직의 peer들에게 전달하고, 최신 블록을 전달 받은 peer는 해당 블록이 올바르게 생성 되었는지 검증하는 과정
  - orderer는 자신이 생성한 최신 블록을 각 조직의 Leader peer에게 전달
  - Leader peer는 orderer로부터 전달받은 최신 블록을 자신이 속한 채널의 peer들에게 배포
  - 최신 블록을 받은 peer들은 블록에 포함된 결과값이 정상인지, 각각의 트랜잭션 결과값이 보증 정책에 부합하는지 검증 작업을 수행, 문제가 없을 시 자신의 로컬 저장소에 저장된 블록체인에 최신 블록을 추가하고 World state 데이터 베이스를 업데이트
  - 검증 과정과 트랜잭션 제출 과정은 차이점이 있다. 트랜잭션 제출 과정에서 DApp은 Endorsing peer의 보증을 받지 못한 트랜잭션도 orderer로 제출이 가능, 하지만 Endorsing peer의 보증을 받지 못한 트랜잭션을 제출하더라도 채널 내 모든 peer들이 참여하는 검증 과정을 통해 잘못된 트랜잭션을 탐지 가능
- 1단계 트랜잭션 제출과정에서 Endorsing peer가 체인코드를 실행하고 트랜잭션의 보증 여부를 판단하는 작업, 2단계 블록 패키징 과정에서는 orderer가 채널 내 수신되는 모든 트랜잭션을 모아서 순서대로 정렬한 후 최신 블록을 생성하는 작업을 수행. 3단계 orderer가 peer에게 최신 블록을 전파하면 각 조직의peer들은 최신 블록을 검증한 후 문제가 없을 시 자신의 로컨 저장소에 저장된 블록체인에 최신 블록을 추가하고 World state 데이터베이스를 업데이트하는 작업 수행
- 하이퍼래저 패브릭의 체인코드는 1단계에서 트랜잭션 실행 요청을 받은 Endorsing peer에 의해서만 실행. 네트워크 노드의 과부하 방지 및 성능 향상에 도움
- 오더링 서비스
  - 카프카(Kafka) 분산 메시징 시스템을 이용해 구현
  - pub-sub (Publish-Subscribe) 모델, Consumers가 Producer로부터 Topic단위로 구분된 메시지를 수신하는 분산 메시징 시스템
  - orderer는 Producer가 되고, peer는 Consumer가 된다.
  - 각 채널의 분산원장이 카프카의 Topic으로 처리가 된다.

### 3. 네트워크 구축 과정

- 하이퍼레저 패브릭은 보통 2개 이상의 조직들이 협정을 맺어 네트워크 구축함

#### 3.1. 오더링 서비스 노드 구축

- 컨소시엄 참여 조직 간 협의하에 오더링 서비스 노드를 구축한 후 향후 추가될 peer, channel, client, 네트워크 정책, 채널 정책 등 오더링 서비스에 저장된 configuration block을 통해 설정

#### 3.2. 채널생성

- 오더링 서비스 노드를 통해 채널1을 생성
- 채널1은 비즈니스 이해관계가 맞는 조직 간에만 데이터르르 공유하는 기능을 제공
- 현재 채널이 생성만 되어 있고 조직의 peer들이 참여한 상태가 아님

#### 3.3. 채널 참여

- 조직에서는 자신의 데이터 센터에 peer를 설치한 후 채널1에 peer를 참여시킴
- 채널1에 참여한 peer는 채널1에서 사용되는 분산원장1을 자신의 로컬 저장소에 저장하고 비즈니스 데이터를 공유
- peer는 4가지 역할 중 1개 이상을 선택하여 설치 가능
  - Committing peer: 최신 블록에 대한 검증 작업을 수행하는 peer. 모든 peer는 Committing peer 역할을 수행
  - Endorsing peer: Endorsing peer는 DApp이 제출하는 트랜잭션의 보증 여부를 판단하는 peer. DApp이 Endorsing peer에게 트랜잭션을 제출하면 Endorsing peer는 트랜잭션의 입력값을 이용해 체인코드를 시뮬레이션. 시뮬레이션에 문제가 없다면 Endorsing peer는 Read/Write set과 함께 자신의 Identity가 포함된 디지털 인증서를 DApp으로 보냄
  - Leader peer: 조직의 대표로서 오더링 서비스 노드와 연결되어 최신 블록에 대한 업데이트를 전달받는 peer. Leader peer가 아닌 peer들은 Leader peer로부터 최신 블록을 전달받습니다.
  - Anchor peer: 조직의 peer들 중 대표로, 다른 조직에 설치된 peer간의 통신을 담당하는 peer

#### 3.4. 체인코드/DApp 설치

- peer 설치 후 체인코드, DApp 설치 가능
- 체인코드는 채널 참여자들의 비즈니스 목적에 맞는 스마트 컨트랙트 기능을 가지고 있고 Endorsing peer에 설치
- 각 조직의 채널 참여자들은 체인코드 기능에 알맞은 DApp을 개발하여 트랜잭션을 체인코드가 설치되어 있는 Endorsing peer로 제출

#### 3.5. 새로운 조직/채널 추가

- 오더링 서비스를 통해 새로운 조직을 생성하고 채널 정책 수립 후 채널2를 생성

#### 3.6. 새로운 조직의 남은 구성 요소 설치

- 데이터 센터에 peer를 설치 후 채널2에 참여시킴. 비즈니스 목적에 맞는 체인코드2와 DApp2를 설치. org2와 org3가 비즈니스 협정을 맺었다는 가정하에 org3는 자신의 peer4를 채널 2에 참여시킨 후 체인코드2와 DApp2를 설치. org2의 peer2와 org3의 peer4는 분산원장2를 통해 서로의 비즈니스 데이터를 공유

### 4. 트랜잭션 처리 과정

#### 4.1. 트랜잭션 생성

- 사용자A는 DApp을 통해 사용자B에게 1000원을 송금하는 트랜잭션 생성을 요청
- DApp은 사용자B에게 1000원을 송금하는 내용의 트랜잭션을 생성한 뒤 Endorsing peer에게 전송

#### 4.2. 트랜잭션 보증

- Endorsing peer는 DApp에서 트랜잭션을 받으면 4가지 항목을 검사
  - 체인코드 시뮬레이션 결과값으로 생성된 Read/Write set이 올바른지
    - 트랜잭션의 Proposal, Chaincode name, World state 데이터베이스를 참조하여 시뮬레이션
  - 동일한 트랜잭션이 발생한 적이 있는지 여부 (replay-attack 방지)
  - 사용자A의 MSP가 유효한지
    - 이중 지불 방지를 위한 트랜잭션의 version을 확인하고 인증과 권한 확인을 위해 MSP 검사
  - 사용자A가 분산원장 업데이트 권한을 가지고 있는지 (channel MSP확인)
- 4가지 항목에 이상이 없을 시 Endorsing peer는 Read/Write set과 자신의 Identity로 서명한 디지털 인증서를 DApp에 전송
- 보증정책에 따라 Endorsing peer의 디지털 인증서는 1개 또는 여러개가 필요

#### 4.3. 시뮬레이션 결과값/디지털 인증서 확인

- Endorsing peer에서 받은 시뮬레이션 결과값을 전달받은 DApp은 자신이 예상한 값과 Read/Write set이 동일한지 확인하는 작업을 수행
  - Read: {(사용자A, 사용자A의 잔액, 현재 State DB의 레코드 버전(현재 블록체인의 높이);(사용자B, 사용자B의 잔액, 현재 State DB의 레코드 버전(현재 블록체인의 높이) )}
  - Write:{(사용자A, 사용자A의 잔액 -1000원);(사용자B, 사용자B의 잔액 +1000원 )} 
- Read/Write set이 예상한 값과 다르거나 보증 정책을 충족시키지 못했다고 하더라도 DApp은 강제로 해당 트랜잭션을 orderer에 전송하여 블록에 포함시키는 시도 가능

#### 4.4. 최신 블록 생성

- DApp은 블록을 생성하기 위해 Read/Write set과 Endorsing peer의 디지털 인증서가 담긴 트랜잭션을 orderer로 브로드캐스트함.
- orderer는 트랜잭션 정렬에 필요한 Timestamp 필드를 확인한 후, 블록에 포함될 트랜잭션을 정해진 순서대로 정렬하여 최신 블록을 생성
  - 트랜잭션 정렬 시 트랜잭션의 내용은 확인하지 않고 트랜잭션 발생 시간 등 정렬에 필요한 값만 참조하여 블록을 생성함
  - orderer가 속한 모든 채널의 트랜잭션을 채널별로 구분하여 순서대로 정렬

#### 4.5. 최신 블록 검증

- orderer는 최신 블록을 Committing peer로 전달
- Committing peer는 해당 블록을 검증하기 위해 VSCC 시스템 체인코드를 실행하여 블록에 포함된 각각의 트랜잭션마다 다음과 같은 작업을 수행
  - 보증 정책 확인: 최신 블록을 전달받은 peer는 블록에 포함된 각각의 트랜잭션마다 보증 정책에 부합하는Endorsing peer의 디지털 인증서가 존재하는지 확인. 만약 보증 정책을 만족시키지 않는다면 해당 트랜잭션은 부적합(invalid) 판정을 받고 최신 블록에 트랜잭션 내용이 반영 안됨
  - Read/Write set 확인: 블록에 포함된 각 트랜잭션마다 Read/Write set 결과값을 확인함. Read set에 포함된 키 값이 사용될  때 State DB의 레코드 버전(블록 버전)을 확인한 후, 현재 블록체인의 버전과 일치하는지 확인. 만약 일치하지 않는다면 해당 트랜잭션은 부적합 판정을 받고 최신 블록에 트랜잭션 내용이 반영되지 않음

#### 4.6. 최신 블록 업데이트

- peer는 자신의 로컬 저장소에 저장되어 있는 블록체인에 최신 블록을 추가하여 저장
- 트랜잭션 작업 후에 유효 태그를 가진 트랜잭션의 내용만을 World state 데이터베이스에 업데이트 함. 무효 태그를 가진 트랜잭션도 블록체인에 저장되지만 World state 데이터베이스에는 반영 안됨
- World state 데이터 베이스까지 트랜잭션이 업데이트가 완료되면 분산원장에서 거래 내역 확인 가능

### 5. 합의

- 트랜잭션 생성부터 최신 블록이 peer에 저장되기까지 과정을 합의라고 함
  - 보증 정책 확인(Endorsement)
  - 트랜잭션을 정해진 순서에 맞춰 정렬(Ordering)
  - 정렬된 트랜잭션의 유효성 검증 후 최신 블록 업데이트 (Validation)
- 현재 트랜잭션 정렬 방법은 Kafka, Solo가 있고 추후 Raft기반의 합의 알고리즘 지원 예정
- Kafka: 트랜잭션을 순차적으로 정렬, 여러 개의 노드를 클러스터 형태로 구성하여 특정 노드에 장애가 발생했을 시 다른 노드가 그 역할을 대신할 수 있는 장애 허용 트랜잭션 정렬 시스템(crash fault tolerance)
- Solo: orderer 1대가 트랜잭션의 정렬부터 최신 블록 생성까지 모든 것을 담당하는 시스템, 장애 허용 기능이 없고, 상용화 시스템에는 사용 불가, 주로 개발환경 구축에 사용하는 기술