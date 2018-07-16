﻿//*******************************************************************************
//
//    Copyright 2018 Microsoft
//    
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//    
//        http://www.apache.org/licenses/LICENSE-2.0
//    
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
//
//*******************************************************************************

/// <reference path="~/scripts/cryptoMath.js" />
/// <reference path="~/scripts/rsa-base.js" />
/// <reference path="~/scripts/rsa.js" />
/// <reference path="~/scripts/qunit/qunit-1.15.0.js" />

var cryptoMath = cryptoMath || msrCrypto.cryptoMath;
var mathRSAKATs = mathRSAKATs || {};

module("cryptoMath-RSAKAT");
mathRSAKATs.testDescription = "Math RSA KAT";

// Numbers computed in Maple
mathRSAKATs.p0 = cryptoMath.stringToDigits("61");
mathRSAKATs.q0 = cryptoMath.stringToDigits("67");
mathRSAKATs.e0 = cryptoMath.stringToDigits("7");
mathRSAKATs.d0 = cryptoMath.stringToDigits("2263");
mathRSAKATs.dp0 = cryptoMath.stringToDigits("43");
mathRSAKATs.dq0 = cryptoMath.stringToDigits("19");
mathRSAKATs.qinv0 = cryptoMath.stringToDigits("51");
mathRSAKATs.n0 = cryptoMath.stringToDigits("4087");
mathRSAKATs.m0 = cryptoMath.stringToDigits("3359");
mathRSAKATs.c0 = cryptoMath.stringToDigits("2720");
mathRSAKATs.m2 = cryptoMath.stringToDigits("2487");
mathRSAKATs.c2 = cryptoMath.stringToDigits("3402");

mathRSAKATs.p1 = cryptoMath.stringToDigits("179769313486231590772930519078902473361797697894230657273430081157732675805500963132708477322407536021120113879871393357658789768814416622492847430639474124377767893424865485276302219601246094119453082952085005768838150682342462881473913110540827237163350510684586298239947245938479716304835356329624218582039");
mathRSAKATs.q1 = cryptoMath.stringToDigits("179769313486231590772930519078902473361797697894230657273430081157732675805500963132708477322407536021120113879871393357658789768814416622492847430639474124377767893424865485276302219601246094119453082952085005768838150682342462881473913110540827237163350510684586298239947245938479716304835356329624218583163");
mathRSAKATs.e1 = cryptoMath.stringToDigits("65537");
mathRSAKATs.d1 = cryptoMath.stringToDigits("14351498309343356523490635383783973661546380885597440335552765206260243269628013130836189478934996619424087882183666020100963664029721955041449037750510258814758702029356366483883878653697002226470428330676257724752853513761307435240156490190686336960431637409061516730521690171161499294958789767979962644256835188367752099485264179584332437506886024436170604400262042023818027359679217593131459795618977415080681257733833245797448253712633717432670078128016690158168126847929889620136150214211102270878481560470358531683054505836984334246905598943376333910306592768181815747728896822160571258992601983440749585199425");
mathRSAKATs.dp1 = cryptoMath.stringToDigits("46499678078316034099557778955789168384716947292414942736151894895797554362495267208228544296648497041824132482286034762028042238139402026099741362042821083608525280823631226733049654800804488876710387448368784317154345337245669328268699742891620051640952711554161876920878064500192382177999740001827818688721");
mathRSAKATs.dq1 = cryptoMath.stringToDigits("19253258638019127143982777872267825206012756786542029439892057000566483840865637124501896674031135012775105349997975341828387710565152360853827549562208658910349159161223901630443341614372741117604424817136650372941620453169381371821496194865283219824672432892795081058733077791815144555650081115669505626367");
mathRSAKATs.qinv1 = cryptoMath.stringToDigits("5917673130774527454269065129821522699632130624632147970744584522096182388615245227678126032855052342332245741597189994869550908759905173516223625385818988080051078342277600493970802602532122315320074794686072253956415992212340859977344114848763885920857623572357378144909295462387677494020380946793679793181");
mathRSAKATs.n1 = cryptoMath.stringToDigits("32317006071311007300714876688669951960444102669715484032130345427524655138867890893197201411522913463688717960921898019494119559150490921095088152386448283120630877367300996091750197750389652106796057638384067568276792218642619756161838094338476170470581645852036305042887575891541065808607552399123928388423263872741093180057774507870840424411016798511281620350417305740756987447243797535152734183392785208523225920039231153600534944970726549688941814648106526000812453366315824154818096350580756671696954751272019348086341197909436242198470511692221525127149789608791233435502321341586186982107958102322401459609357");
mathRSAKATs.m1 = cryptoMath.stringToDigits("31890151060914475693971419229528418363903267446639630144309623704700692284188061392193938380266540651318412546364796741792887474305297304292520698650791691193588018430040757950646209333737907613269094549568004266902750751055085337014216938093898448123378986465747976651160752521954968252109817870988547950474106620444089732726100286248696967726477945064454073552965969907618923321280049619581830371424872307128811836328802624334103000960561603960818951854451420515709274694351529017737746210057837529206739246180712320551711911308075327517122086975328364576052853143353005142899254737937092766611532051906049283613306");
mathRSAKATs.c1 = cryptoMath.stringToDigits("11876385313787872724640486578080180450972533519808507136363516904921943307470552052840654401070046392542373524840249590146949754941812840531981740820508256710072114071566322946320750920023230739591498665228804577237993475228229590487716107379837122619665303564748081285638931790117763148179603234138764896312948802876842682745131254540975228513050638851811155811423362360058373402037221176975395301746394917450639830677730026334252487484404173951704679232575292859214812730517665337651320467081849031889302608631285635452133008899453506497411750251277841398523733916949794010133213074892910471633412826665978897107226");

mathRSAKATs.p3 = cryptoMath.stringToDigits("13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084171");
mathRSAKATs.q3 = cryptoMath.stringToDigits("13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084241");
mathRSAKATs.e3 = cryptoMath.stringToDigits("7");
mathRSAKATs.d3 = cryptoMath.stringToDigits("154087982988198506376797587781916405738683741052197706234368640992342293547572254113750123419206459446674383325604051449421819801840928533565297797690980326239911389352314164926072995836315901103887404651864013861628184594486587641184162216403852247523360232254003673313457169387085189134643153312949328983543");
mathRSAKATs.dp3 = cryptoMath.stringToDigits("11492406797093654656777735712747868109268027846222051466620195523190083454348754551544463684143060080877170164159845186446074756695954202811228842005215003");
mathRSAKATs.dq3 = cryptoMath.stringToDigits("11492406797093654656777735712747868109268027846222051466620195523190083454348754551544463684143060080877170164159845186446074756695954202811228842005215063");
mathRSAKATs.qinv3 = cryptoMath.stringToDigits("11300866683808760412498106784202070307446894048785017275509858931136915396776275309018722622740675746195883994757181100005306844084354966097708361305128087");
mathRSAKATs.n3 = cryptoMath.stringToDigits("179769313486231590772930519078902473361797697894230657273430081157732675805500963132708477322407536021120113879871393357658789768814416622492847430639477074095512480796227391561801824887394139579933613278628104952355769470429079061808809522886423955917442317693387325171135071792698344550223571732405562649211");
mathRSAKATs.m3 = cryptoMath.stringToDigits("176537431815172002555130320878442281983447543113388197382434902302774285520763423390743648225243451329880596474630649468261878894083432770160377615105387148956127735234915019698908542144523552580562116201183781240797245887271514599243382338587346905095769786018299846610537130383263285301830980630972751662218");
mathRSAKATs.c3 = cryptoMath.stringToDigits("134327232343803729632998224241729515090793916007258596348262967884367444466724471912403551965358016224420016164750098397986744461589433027707587545153785499253160286278662384965274250792829524920835605131016014118323823813809048441345782191651647723332223703435805635858773572044362285097450259265109030706479");

// mod 1024 slow!
//n = a8d68acd413c5e195d5ef04e1b4faaf242365cb450196755e92e1215ba59802aafbadbf2564dd550956abb54f8b1c917844e5f36195d1088c600e07cada5c080ede679f50b3de32cf4026e514542495c54b1903768791aae9e36f082cd38e941ada89baecada61ab0dd37ad536bcb0a0946271594836e92ab5517301d45176b5
//p = c107a2fe924b76e206cb9bc4af2ab7008547c00846bf6d0680b3eac3ebcbd0c7fd7a54c2b9899b08f80cde1d3691eaaa2816b1eb11822d6be7beaf4e30977c49
//q = dfea984ce4307eafc0d140c2bb82861e5dbac4f8567cbc981d70440dd639492079031486315e305eb83e591c4a2e96064966f7c894c3ca351925b5ce82d8ef0d
//SHAAlg = SHA1
//e = 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003
//d = 1c23c1cce034ba598f8fd2b7af37f1d30b090f7362aee68e5187adae49b9955c729f24a863b7a38d6e3c748e2972f6d940b7ba89043a2d6c2100256a1cf0f56a8cd35fc6ee205244876642f6f9c3820a3d9d2c8921df7d82aaadcaf2d7334d398931ddbba553190b3a416099f3aa07fd5b26214645a828419e122cfb857ad73b
//Msg = d73829497cddbe41b705faac50e7899fdb5a38bf3a459e536357029e64f8796ba47f4fe96ba5a8b9a4396746e2164f55a25368ddd0b9a5188c7ac3da2d1f742286c3bdee697f9d546a25efcfe53191d743fcc6b47833d993d08804daeca78fb9076c3c017f53e33a90305af06220974d46bf19ed3c9b84edbae98b45a8771258
//S = 175015bda50abe0fa7d39a8353885ca01be3a7e7fcc55045744111362ee1914473a48dc537d956294b9e20a1ef661d58537acdc8de908fa050630fcc272e6d001045e6fdeed2d10531c8603334c2e8db39e73e6d9665ee1343f9e4198302d2201b44e8e8d06b3ef49cee6197582163a8490089ca654c0012fce1ba6511089750
//Result = P
mathRSAKATs.p4 = cryptoMath.stringToDigits("c107a2fe924b76e206cb9bc4af2ab7008547c00846bf6d0680b3eac3ebcbd0c7fd7a54c2b9899b08f80cde1d3691eaaa2816b1eb11822d6be7beaf4e30977c49", 16);
mathRSAKATs.q4 = cryptoMath.stringToDigits("dfea984ce4307eafc0d140c2bb82861e5dbac4f8567cbc981d70440dd639492079031486315e305eb83e591c4a2e96064966f7c894c3ca351925b5ce82d8ef0d", 16);
mathRSAKATs.e4 = cryptoMath.stringToDigits("0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003", 16);
mathRSAKATs.d4 = cryptoMath.stringToDigits("1c23c1cce034ba598f8fd2b7af37f1d30b090f7362aee68e5187adae49b9955c729f24a863b7a38d6e3c748e2972f6d940b7ba89043a2d6c2100256a1cf0f56a8cd35fc6ee205244876642f6f9c3820a3d9d2c8921df7d82aaadcaf2d7334d398931ddbba553190b3a416099f3aa07fd5b26214645a828419e122cfb857ad73b", 16);
//mathRSAKATs.dp4 = cryptoMath.stringToDigits("");
//mathRSAKATs.dq4 = cryptoMath.stringToDigits("");
//mathRSAKATs.qinv4 = cryptoMath.stringToDigits("");
mathRSAKATs.n4 = cryptoMath.stringToDigits("a8d68acd413c5e195d5ef04e1b4faaf242365cb450196755e92e1215ba59802aafbadbf2564dd550956abb54f8b1c917844e5f36195d1088c600e07cada5c080ede679f50b3de32cf4026e514542495c54b1903768791aae9e36f082cd38e941ada89baecada61ab0dd37ad536bcb0a0946271594836e92ab5517301d45176b5", 16);
mathRSAKATs.m4 = cryptoMath.stringToDigits("d73829497cddbe41b705faac50e7899fdb5a38bf3a459e536357029e64f8796ba47f4fe96ba5a8b9a4396746e2164f55a25368ddd0b9a5188c7ac3da2d1f742286c3bdee697f9d546a25efcfe53191d743fcc6b47833d993d08804daeca78fb9076c3c017f53e33a90305af06220974d46bf19ed3c9b84edbae98b45a8771258", 16);
mathRSAKATs.c4 = cryptoMath.stringToDigits("175015bda50abe0fa7d39a8353885ca01be3a7e7fcc55045744111362ee1914473a48dc537d956294b9e20a1ef661d58537acdc8de908fa050630fcc272e6d001045e6fdeed2d10531c8603334c2e8db39e73e6d9665ee1343f9e4198302d2201b44e8e8d06b3ef49cee6197582163a8490089ca654c0012fce1ba6511089750", 16);

// mod 1536 fast!
//n = d2b6c8fd44e7eb621fa6685fb62371872b5e8408af51bd1b44c6473823402418a26963b98e6fb191cf74175e64132ae6cd101133fc002a89c10bf7739eb930b9c067b52570842395657f927434aa3acbf3369dcdc3990f77cbf22939ddd5877f09c8aab818b80aa20544b6928fe62c78795a4160aecde6ab454db0dcdf1d6c13522526c5ccf82d429791059306f02cdc18c4e580ec6c2da19b3c6de63933ebeac79010c73df95748d987e96a0f8ad523b5014b33423f55922aec2ec23b9aa22f
//p = f260d143cff1e8e0931765da8cb335c0206bf7fd19aaf8ff41e762992f2bb0a660cd65f08a80fe502c9125166a6927aa1859a874159796fada835b48522f5795ed1f8d23f05016358ff908b0dd638bb7ed12c8b80b46aa858d52c77bb7fc0ed1
//q = de8e674fac0b7ea32d518a22030fd10d4298a77974db8febe195a4240dc5373e8161baf8ce47dc4fd076f64e307ea6262c35b9819bac4f142b613973eeb6a62a15a2ff09fba9ce4db7186969af925ee3acb7d3be7a1f9c85358216640fc1e0ff
//SHAAlg = SHA1
//e = 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011
//d = 076fdcedd54168af223f18c42188c7c5860c5f03517b5b00f66159dad4115297752adf60e6e8d614347f9466b83ce96b88be4ee9bd999b19f1bb26d9ea7f01b84003a907584cf232730480a6bc9692a3cf5c47d40ff051dd133ec2353e0a8c4fb6b65b5ea82aba7686f2aca7edef2b7e824b4dff3a5cdf2aec1c726d8a3dce741605abe0a0b66047ff6e3e7a1be8338af56b4cecd1e650d4fc3c52f56f29e746c7b2ec95f9dbd6dfd1f822541fb6f331faefdc00a346e86b2dd6a88076894b91
//Msg = 95e319c0df793cf1c1b424a8949b9529d6c1a0cece5f6db573a538b68b529a9810830a84d7c8a3b9747d2882585845653c3e179ec35befcc5a7153e96370467f9448ca1999fba2f801f65c0857a18f138f356233a5ce4d8d80c1243c1c2f518ce8da60696d38c21731c6ca23db9ffc99974d8777bcdf1062ad3bb198fdb64226
//S = 1b5d13124f4a0ba3b4e8f102a7044d8a633ea025729f55ac75e4a8544612f229d4f43c45574983b51efc83ab611a60b009949dd032c97358bb7ae5d3b2ce417fe11a9f6435b84bf7113b23403b010fd749838823450ec954f6e3f54c13db12606ead2eadbf209d5d31efaaa0924f256d3f64692db8a2b7fd8197df13c33b160b2f8fef0d4f2ccdd1e1a5b269b25e4efb462c000573b8584d45c2cafd248348f19cf1f7422abaa402ba54274b7611c4c9db3a7dac61ce51c396cc3c59ecbe5594
//Result = P
mathRSAKATs.p5 = cryptoMath.stringToDigits("f260d143cff1e8e0931765da8cb335c0206bf7fd19aaf8ff41e762992f2bb0a660cd65f08a80fe502c9125166a6927aa1859a874159796fada835b48522f5795ed1f8d23f05016358ff908b0dd638bb7ed12c8b80b46aa858d52c77bb7fc0ed1", 16);
mathRSAKATs.q5 = cryptoMath.stringToDigits("de8e674fac0b7ea32d518a22030fd10d4298a77974db8febe195a4240dc5373e8161baf8ce47dc4fd076f64e307ea6262c35b9819bac4f142b613973eeb6a62a15a2ff09fba9ce4db7186969af925ee3acb7d3be7a1f9c85358216640fc1e0ff", 16);
mathRSAKATs.e5 = cryptoMath.stringToDigits("000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011", 16);
mathRSAKATs.d5 = cryptoMath.stringToDigits("076fdcedd54168af223f18c42188c7c5860c5f03517b5b00f66159dad4115297752adf60e6e8d614347f9466b83ce96b88be4ee9bd999b19f1bb26d9ea7f01b84003a907584cf232730480a6bc9692a3cf5c47d40ff051dd133ec2353e0a8c4fb6b65b5ea82aba7686f2aca7edef2b7e824b4dff3a5cdf2aec1c726d8a3dce741605abe0a0b66047ff6e3e7a1be8338af56b4cecd1e650d4fc3c52f56f29e746c7b2ec95f9dbd6dfd1f822541fb6f331faefdc00a346e86b2dd6a88076894b91", 16);
//mathRSAKATs.dp5 = cryptoMath.stringToDigits("");
//mathRSAKATs.dq5 = cryptoMath.stringToDigits("");
//mathRSAKATs.qinv5 = cryptoMath.stringToDigits("");
mathRSAKATs.n5 = cryptoMath.stringToDigits("d2b6c8fd44e7eb621fa6685fb62371872b5e8408af51bd1b44c6473823402418a26963b98e6fb191cf74175e64132ae6cd101133fc002a89c10bf7739eb930b9c067b52570842395657f927434aa3acbf3369dcdc3990f77cbf22939ddd5877f09c8aab818b80aa20544b6928fe62c78795a4160aecde6ab454db0dcdf1d6c13522526c5ccf82d429791059306f02cdc18c4e580ec6c2da19b3c6de63933ebeac79010c73df95748d987e96a0f8ad523b5014b33423f55922aec2ec23b9aa22f", 16);
mathRSAKATs.m5 = cryptoMath.stringToDigits("95e319c0df793cf1c1b424a8949b9529d6c1a0cece5f6db573a538b68b529a9810830a84d7c8a3b9747d2882585845653c3e179ec35befcc5a7153e96370467f9448ca1999fba2f801f65c0857a18f138f356233a5ce4d8d80c1243c1c2f518ce8da60696d38c21731c6ca23db9ffc99974d8777bcdf1062ad3bb198fdb64226", 16);
mathRSAKATs.c5 = cryptoMath.stringToDigits("1b5d13124f4a0ba3b4e8f102a7044d8a633ea025729f55ac75e4a8544612f229d4f43c45574983b51efc83ab611a60b009949dd032c97358bb7ae5d3b2ce417fe11a9f6435b84bf7113b23403b010fd749838823450ec954f6e3f54c13db12606ead2eadbf209d5d31efaaa0924f256d3f64692db8a2b7fd8197df13c33b160b2f8fef0d4f2ccdd1e1a5b269b25e4efb462c000573b8584d45c2cafd248348f19cf1f7422abaa402ba54274b7611c4c9db3a7dac61ce51c396cc3c59ecbe5594", 16);



mathRSAKATs.kat = [
    { p: mathRSAKATs.p0, q: mathRSAKATs.q0, n: mathRSAKATs.n0, e: mathRSAKATs.e0, d: mathRSAKATs.d0, dp: mathRSAKATs.dp0, dq: mathRSAKATs.dq0, qinv: mathRSAKATs.qinv0, m: mathRSAKATs.m0, c: mathRSAKATs.c0 },
    { p: mathRSAKATs.p0, q: mathRSAKATs.q0, n: mathRSAKATs.n0, e: mathRSAKATs.e0, d: mathRSAKATs.d0, dp: mathRSAKATs.dp0, dq: mathRSAKATs.dq0, qinv: mathRSAKATs.qinv0, m: mathRSAKATs.m2, c: mathRSAKATs.c2 },
    //{ p: mathRSAKATs.p1, q: mathRSAKATs.q1, n: mathRSAKATs.n1, e: mathRSAKATs.e1, d: mathRSAKATs.d1, dp: mathRSAKATs.dp1, dq: mathRSAKATs.dq1, qinv: mathRSAKATs.qinv1, m: mathRSAKATs.m1, c: mathRSAKATs.c1 },
    { p: mathRSAKATs.p3, q: mathRSAKATs.q3, n: mathRSAKATs.n3, e: mathRSAKATs.e3, d: mathRSAKATs.d3, dp: mathRSAKATs.dp3, dq: mathRSAKATs.dq3, qinv: mathRSAKATs.qinv3, m: mathRSAKATs.m3, c: mathRSAKATs.c3 }
];

test("RSA KAT Raw Encrypt", function () {
    // RSA with CRT
    // c = m^e mod n
    // m = c^d mod n
    // m1 = c^dp mod p-1
    // m2 = c^dq mod q-1
    // qInv = q^-1 mod p
    // m = ((m1-m2)^qInv mod p)*q + m2
    var numberOfTests = mathRSAKATs.kat.length;
    expect(numberOfTests);

    var paddingMode = "raw";
    for (var i = 0; i < numberOfTests; ++i) {
        var kat = mathRSAKATs.kat[i];
        var keyStruct = {
            e: cryptoMath.digitsToBytes(kat.e), n: cryptoMath.digitsToBytes(kat.n), d: cryptoMath.digitsToBytes(kat.d),
            p: cryptoMath.digitsToBytes(kat.p), q: cryptoMath.digitsToBytes(kat.q),
            dp: cryptoMath.digitsToBytes(kat.dp), dq: cryptoMath.digitsToBytes(kat.dq), qi: cryptoMath.digitsToBytes(kat.qinv)
        };
        var rsa = msrcryptoRsa(keyStruct, paddingMode);

        var m = cryptoMath.digitsToBytes(kat.m);
        var c = cryptoMath.digitsToBytes(kat.c);
        var cc = cryptoMath.bytesToDigits(rsa.encrypt(m));
        var mm = cryptoMath.bytesToDigits(rsa.decrypt(c));

        // Verify results
        var pass = cryptoMath.compareDigits(cc, kat.c) === 0 &&
            cryptoMath.compareDigits(mm, kat.m) === 0;
        ok(pass, "RSA Raw Encrypt test. " +
            "c=" + kat.c.toString() + "\n" +
            "cc=" + cc.toString() + "\n" +
            "m=" + kat.m.toString() + "\n" +
            "mm=" + mm.toString()
            );
    }
});
